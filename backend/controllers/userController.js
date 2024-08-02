import User from "../models/userModel.js";
import CustomError from "../utils/customError.js";


const registerUser = async (req, res, next) => {
    try {
        const user = req.body;
        const registeredUser = await User.create(user);
        //send  token for authorize
        
    } catch (e) {
        res.status(400).send({
            success: false,
            message: e.message
        })
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, phoneNo, password } = req.body;
        if (email) {
            var user = await User.findOne({ email: email });
        } else if (phoneNo) {
            var user = await User.findOne({ phoneNumber: phoneNo });
        } else {
            throw new CustomError("Enter email or password")
        }

        if (!user) {
            throw new CustomError("user does not exist");
        }
        const checkPassword = user.comparePassword(password);
        if (!checkPassword) {
            throw new CustomError("Invalid user or password");
        }

        //send  token for authorize

    } catch (e) {
        res.status(400).send({
            success: true,
            message: e.message
        })
    }
}
const logoutUser = async (req, res, next) => {
    try {
        //token remove
        res.status(200).send({
            success: true,
            message: "Logged out successfully"
        })
    } catch (e) {
        res.status(400).send({
            success: false,
            message: "An error occurred"
        })
    }
}
const updateUser = async (req, res, next) => {
    try {
        const updates = req.body;
        const user = await User.findOne({username:req.username})
        const updatedUser = await User.findByIdAndUpdate(user._id, updates, {
            new: true,
        });
        res.status(200).send({
            success: true,
            message: "User updated successfully",
            updatedUser,
        });
    } catch (e) {
        res.status(400).send({
            success: false,
            message: e.message,
        });
    }
};
const updatePassword=async(req,res,next) => {
    const {email,oldPassword,newPassword} = req.body;
    if(!oldPassword) {
        throw new CustomError("Enter password");
    }
    const user = await User.findOne({username:req.username});
    const checkPassword = await user.comparePassword(oldPassword);
    if(!checkPassword) {
        throw new CustomError("Enter valid password");
    }
    user.password=newPassword;
    await user.save();
    //sendToken
}
const getMe = async (req, res, next) => {
    try {
        const user = await User.findOne({username:req.username})
        res.status(200).send({
            success: true,
            user,
        });
    } catch (e) {
        res.status(400).send({
            success: false,
            message: e.message,
        });
    }
};

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new CustomError("User does not exist");
        }
        const OTP = "494943";

        //send mail with otp 
        user.otp=OTP;
        await user.save();
        res.status(200).send({
            success: true,
            message: "OTP sent to your email",
        });
    } catch (e) {
        res.status(400).send({
            success: false,
            message: e.message,
        });
    }
};
const ressetPasswordByOTP = async(req,res,next) => {
    try{
        const {otp,password} = req.body;
        const user = await User.findById(req.user._id);
        if(user.otp !== otp) {
            throw new CustomError("Enter Valid otp");
        }
        user.password = password;
        await user.save();
        res.status(200).send({
            success:true,
            message:"password changed successfully"
        })
    }catch(e) {
        res.status(400).send({
            success:false,
            message:e.message
        })
    }
}
const adminDeleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new CustomError("User does not exist");
        }
        res.status(200).send({
            success: true,
            message: "User deleted successfully",
        });
    } catch (e) {
        res.status(400).send({
            success: false,
            message: e.message,
        });
    }
};

const adminGetUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            throw new CustomError("User does not exist");
        }
        res.status(200).send({
            success: true,
            user,
        });
    } catch (e) {
        res.status(400).send({
            success: false,
            message: e.message,
        });
    }
};
const adminGetAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.status(200).send({
            success: true,
            users,
        });
    } catch (e) {
        res.status(400).send({
            success: false,
            message: e.message,
        });
    }
};

export {
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
    updatePassword,
    ressetPasswordByOTP,
    getMe,
    forgotPassword,
    adminDeleteUser,
    adminGetUser,
    adminGetAllUsers,
};  