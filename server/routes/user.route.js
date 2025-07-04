import express from "express";
import { registerUser, login, logout } from "../controllers/user.controller.js";
import { updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/update-profile").post(updateProfile);

export default router;
