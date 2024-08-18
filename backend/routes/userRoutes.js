import express from "express";
import {
  registerUser, loginUser, logoutUser, updateUser, getMe, forgotPassword, adminDeleteUser, addFavouriteRoute,
  adminGetUser, adminGetAllUsers, updatePassword, ressetPasswordByOTP, updateRoleAdmin, refresh
} from "../controllers/userController.js";
import { isAuthenticatedAccess, isAuthenticatedRefresh, isAuthrorizeRoles } from "../middlewares/Authentication.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").put(ressetPasswordByOTP);


router.route("/logout").get(isAuthenticatedRefresh,logoutUser);
router.route("/update/me").put(isAuthenticatedAccess,updateUser);
router.route("/update/password").put(isAuthenticatedAccess,updatePassword);
router.route("/me").get(isAuthenticatedAccess,getMe);
router.route("/refresh").get(isAuthenticatedRefresh,refresh);
router.route("/save-favourite-route").post(isAuthenticatedAccess,addFavouriteRoute);

router.route("/admin/delete/:id").delete(isAuthenticatedAccess,isAuthrorizeRoles,adminDeleteUser);
router.route("/admin/getuser/:id").get(isAuthenticatedAccess,isAuthrorizeRoles,adminGetUser);
router.route("/admin/get-all-user").get(isAuthenticatedAccess,isAuthrorizeRoles,adminGetAllUsers);
router.route("/admin/update-role").post(isAuthenticatedAccess,isAuthrorizeRoles,updateRoleAdmin);

export default router;