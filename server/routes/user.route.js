import express from "express";
import { registerUser, login, logout, getAllUser, getUserById, updateProfile, saveProfile,getUserByIdforAppliedJobs ,getUserProfileLogo, getRecommendations } from "../controllers/user.controller.js";
import { profileUpload } from "../middlewares/multer.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/update-profile").post(updateProfile);    
router.route("/getallusers").get(getAllUser);
router.route("/getuser/:id").get(getUserById);
router.route("/save-profile").put(profileUpload,saveProfile);
router.route("/getuserappliedjobs/:id").get(getUserByIdforAppliedJobs);
router.route("/getuserprofilelogo/:id").get(getUserProfileLogo);
router.get('/recommendations/:id', getRecommendations);

// to test use
// localhost:4000/api/user/register
// localhost:4000/api/user/login
// localhost:4000/api/user/logout
// localhost:4000/api/user/update-profile
// localhost:4000/api/user/getallusers
// localhost:4000/api/user/getuser/:id
// localhost:4000/api/user/save-profile
// localhost:4000/api/user/getuserappliedjobs/:id
// localhost:4000/api/user/getuserprofilelogo/:id
// localhost:4000/api/user/recommendations/:id

export default router;  
