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
  updateRoleAdmin
} from "../controllers/userController.js";
import { addTokenToRequest } from "../middlewares/tokenChecker.js"
import { isAuthenticated, isAuthrorizeRoles } from "../middlewares/Authentication.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(addTokenToRequest,logoutUser);
router.route("/update/me").put(isAuthenticated,updateUser);
router.route("/update/password").put(isAuthenticated,updatePassword);
router.route("/reset-password").put(ressetPasswordByOTP);
router.route("/me").get(isAuthenticated,getMe);
router.route("/forgot-password").post(forgotPassword);

router.route("/admin/delete/:id").delete(isAuthenticated,isAuthrorizeRoles,adminDeleteUser);
router.route("/admin/getuser/:id").get(isAuthenticated,isAuthrorizeRoles,adminGetUser);
router.route("/admin/get-all-user").get(isAuthenticated,isAuthrorizeRoles,adminGetAllUsers);
router.route("/admin/update-role").post(isAuthenticated,isAuthrorizeRoles,updateRoleAdmin);

export default router;