import blackListedToken from "../models/blackListedToken.js";
import User from "../models/userModel.js";
import CustomError from "../utils/customError.js";
import { newAccessToken, signUser } from "../utils/jwt.helper.js";
import { sendEmail } from "../utils/SendMail.js";

const sendToken = (res, user, accessToken, refreshToken) => {
    res.status(200).json({
        success: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
        user
    });
};

const registerUser = async (req, res, next) => {
    try {
        const { username, phoneNumber, email, password, city, nearestRailStation, nearestMetroStation } = req.body;

        const user = await User.create(req.body);
        const { accessToken, refreshToken } = signUser(user.username);
        await sendEmail(
            user.email,
            "Welcome to Smart Transportation – Explore Our Best Features!",
            'Thank you for registering on our platform! Enjoy real-time tracking, seamless connectivity, and an efficient user-friendly interface.',
            `
        <h1>Welcome to Our Smart Transportation System!</h1>
        <p>We are thrilled to have you on board. Here are the top 3 features you will love:</p>
        <ul>
            <li>Real-Time Tracking</li>
            <li>Seamless Connectivity</li>
            <li>User-Friendly Interface</li>
        </ul>
        <p>If you need help, please visit the <a href="">Contact Us</a> section on our website.</p>
        <p>This is auto-generated email. Please do not reply to this email.</p>
    `
        );
        sendToken(res, user, accessToken, refreshToken);
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const refresh = async (req, res) => {
    try {
        const { username } = req;
        const { accessToken } = newAccessToken(username);

        res.status(200).json({
            success: true,
            accessToken: accessToken,
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, phoneNo, username, password } = req.body;
        let user;

        if (email) user = await User.findOne({ email: email });
        else if (phoneNo) user = await User.findOne({ phoneNumber: phoneNo });
        else if (username) user = await User.findOne({ username: username });
        else throw new CustomError("Enter email or phone number");

        if (!user) throw new CustomError("User does not exist");

        const checkPassword = await user.comparePassword(password);
        if (!checkPassword) throw new CustomError("Invalid email or password");

        const { accessToken, refreshToken } = signUser(user.username);
        sendToken(res, user, accessToken, refreshToken);
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const logoutUser = async (req, res, next) => {
    try {
        const token = req.token;
        const newToken = await blackListedToken.create({
            token: token
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: "An error occurred",
        });
    }
};

const updateUser = async (req, res, next) => {
    try {
        const updates = req.body;
        const user = await User.findOneAndUpdate({ username: req.username }, updates, {
            new: true,
        });
        const { accessToken, refreshToken } = signUser(user.username);
        res.status(200).json({
            success: true,
            accessToken: accessToken,
            refreshToken: refreshToken,
            user,
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const updatePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findOne({ username: req.username });

        if (!oldPassword) throw new CustomError("Enter old password");
        const checkPassword = await user.comparePassword(oldPassword);
        if (!checkPassword) throw new CustomError("Enter valid old password");

        user.password = newPassword;
        await user.save();

        const { accessToken, refreshToken } = signUser(user.username);
        sendToken(res, user, accessToken, refreshToken);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.username });
        res.status(200).json({
            success: true,
            user,
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
};

const forgotPassword = async (req, res, next) => {
    try {
        const { email, phoneNo, username } = req.body;
        let user;

        if (email) user = await User.findOne({ email });
        else if (phoneNo) user = await User.findOne({ phoneNumber: phoneNo });
        else if (username) user = await User.findOne({ username });
        else throw new CustomError("Enter email, phone number, or username");

        if (!user) throw new CustomError("User does not exist");

        const OTP = generateOTP();
        const subject = 'Your One-Time Password (OTP)';
        const message = `Your OTP for verification is ${OTP}.`;

        const htmlContent = `
        <h1>Verification Code</h1>
        <p>Your OTP for verification is:</p>
        <h2>${OTP}</h2>
        <p>This code is valid for 10 minutes. Please do not share it with anyone.</p>
        <p>If you did not request this OTP, please ignore this email or contact support.</p>
        <p>Please do not reply to this email. For assistance, visit the <a href="">Contact Us</a> section on our website.</p>
    `;
        await sendEmail(user.email, subject, message, htmlContent);
        user.otp = OTP;
        await user.save();

        res.status(200).json({
            success: true,
            email: user.email,
            message: "OTP sent to your email"
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new CustomError("Please provide correct email")
        }
        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const verifyOTP = async (req, res, next) => {
    try {
        const { email, otp } = req.body
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new CustomError("Please provide correct email")
        }

        if (user.otp !== otp) throw new CustomError("Enter valid OTP");

        res.status(200).json({
            success: true,
            email: user.email,
            message: "OTP verified successfully"
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: e.message
        })
    }

}
const adminDeleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) throw new CustomError("User does not exist");

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const adminGetUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) throw new CustomError("User does not exist");

        res.status(200).json({
            success: true,
            user,
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const adminGetAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            users,
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const updateRoleAdmin = async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username });

        if (!user) throw new CustomError("User does not exist");

        user.role = "admin";
        await user.save();

        res.status(200).json({
            success: true,
            message: "User converted to admin",
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
const addFavouriteRoute = async (req, res) => {
    try {
        const { source, destination } = req.body;
        if (!source || !destination) {
            throw new CustomError("Enter source and destination");
        }
        const user = await User.findOne({ username: req.username });
        user.favouriteRoutes.push([source, destination]);
        await user.save();
        res.status(200).json({
            success: true,
            message: "station added as a favourite station",
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}
const contactUs = async (req, res) => {
    try {
        email, subject, message = req.body;
        const username = req.username;
        await sendEmail(process.env.ADMIN_EMAIL, subject, message);
        const UserMailSubject = `Thank you ${username} for giving Feedback`;
        const UserMailMessage = `Dear ${username} Thank you for giving us your valuable feedback for our website. We will look after the matter
    you have raised: ${message}.`
        await sendEmail(email, UserMailSubject, UserMailMessage);
        res.status(200).json({
            success: true,
            message: "mail sent to the user"
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}
const setlruTrains = async (req, res) => {
    try {
        const username = req.username;
        const train = req.body.train;
        const user = await User.findOne({ username: username })
        let trains = user.lruTrains
        if(trains.indexOf(train) !== -1) {
            trains.splice(trains.indexOf(train),1);
        } 
        if(trains.length===5) {
            trains.pop();
        }
        trains.unshift(train);
        user.lruTrains = trains;
        await user.save()
        res.status(200).json({
            success: true,
            message: "lru trains changed successfully",
            trains
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}
const getlruTrains = async (req, res) => {
    try {
        const username = req.username;
        const user = await User.findOne({ username: username })
        const trains = user.lruTrains
        res.status(200).json({
            success: true,
            message: "LRU stations found successfully",
            trains
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}
export {
    registerUser,
    loginUser,
    refresh,
    logoutUser,
    updateUser,
    updatePassword,
    resetPassword,
    verifyOTP,
    getMe,
    forgotPassword,
    adminDeleteUser,
    adminGetUser,
    updateRoleAdmin,
    adminGetAllUsers,
    addFavouriteRoute,
    contactUs,
    getlruTrains,
    setlruTrains
};
