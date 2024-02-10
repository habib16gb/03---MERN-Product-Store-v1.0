import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const routerUser = express.Router();

routerUser.route("/auth").post(authUser);
routerUser.route("/register").post(registerUser);
routerUser.route("/logout").post(logoutUser);
routerUser
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default routerUser;
