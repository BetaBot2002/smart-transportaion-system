import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getMe,
  forgotPassword,
  adminDeleteUser,
  adminGetUser,
  adminGetAllUsers,
  updatePassword,
  ressetPasswordByOTP,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/update/me").put(updateUser);//
router.route("/update/password").put(updatePassword);//
router.route("/reset-password").put(ressetPasswordByOTP);
router.route("/me").get(getMe);//
router.route("/forgot-password").post(forgotPassword);//

router.route("/admin/delete/:id").delete(adminDeleteUser);////
router.route("/admin/getuser/:id").get(adminGetUser);////
router.route("/admin/get-all-user").get(adminGetAllUsers);////

export default router;