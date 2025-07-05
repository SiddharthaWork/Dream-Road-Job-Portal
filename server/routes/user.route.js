import express from "express";
import { registerUser, login, logout, getAllUser, getUserById, updateProfile, saveProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/update-profile").post(updateProfile);    
router.route("/getallusers").get(getAllUser);
router.route("/getuser/:id").get(getUserById);
router.route("/save-profile").put(saveProfile);


export default router;
