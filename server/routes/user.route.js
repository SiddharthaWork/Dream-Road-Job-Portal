import express from "express";
import { registerUser, login, logout, getAllUser, getUserById, updateProfile, saveProfile,getUserByIdforAppliedJobs } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/update-profile").post(updateProfile);    
router.route("/getallusers").get(getAllUser);
router.route("/getuser/:id").get(getUserById);
router.route("/save-profile").put(saveProfile);
router.route("/getuserappliedjobs/:id").get(getUserByIdforAppliedJobs);

// to test use
// localhost:4000/api/user/register
// localhost:4000/api/user/login
// localhost:4000/api/user/logout
// localhost:4000/api/user/update-profile
// localhost:4000/api/user/getallusers
// localhost:4000/api/user/getuser/:id
// localhost:4000/api/user/save-profile
// localhost:4000/api/user/getuserappliedjobs/:id

export default router;  
