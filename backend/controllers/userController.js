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
        username: user.username,
    });
};

const registerUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        const { accessToken, refreshToken } = signUser(user.username);
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
        const { email, phoneNo, password } = req.body;
        let user;

        if (email) user = await User.findOne({ email });
        else if (phoneNo) user = await User.findOne({ phoneNumber: phoneNo });
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
        const token= req.token;
        const newToken = await blackListedToken.create({
            token:token
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

const getMe = async (req, res, next) => {
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
        await sendEmail(user.email, OTP);
        user.otp = OTP;
        await user.save();

        res.status(200).json({
            success: true,
            message: "OTP sent to your email",
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
};

const ressetPasswordByOTP = async (req, res, next) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (user.otp !== otp) throw new CustomError("Enter valid OTP");

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
const addFavouriteRoute = async (req,res)=>{
    try {
        const {source,destination} = req.body;
        if(!source || !destination) {
            throw new CustomError("Enter source and destination");
        }
        const user = await User.findOne({username:req.username});
        user.favouriteRoutes.push([source,destination]);
        await user.save();
        res.status(200).json({
            success: true,
            message: "station added as a favourite station",
        });
    } catch (err) {
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
export {
    registerUser,
    loginUser,
    refresh,
    logoutUser,
    updateUser,
    updatePassword,
    ressetPasswordByOTP,
    getMe,
    forgotPassword,
    adminDeleteUser,
    adminGetUser,
    updateRoleAdmin,
    adminGetAllUsers,
    addFavouriteRoute
};
