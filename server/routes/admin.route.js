import express from "express";
import { login, register, getAllUser, getAllCompany, getAllJobs, deleteJob, blockUser, unblockUser, blockCompany, unblockCompany, checkBlockUser, checkBlockCompany } from "../controllers/admin.controller.js";

const router = express.Router();    


router.route("/login").post(login);    
router.route("/register").post(register);       

router.route("/getAllUser").get(getAllUser);    
router.route("/blockUser/:id").put(blockUser);    
router.route("/unblockUser/:id").put(unblockUser);    


router.route("/getAllCompany").get(getAllCompany);    
router.route("/blockCompany/:id").put(blockCompany);    
router.route("/unblockCompany/:id").put(unblockCompany);    


router.route("/checkBlockUser/:id").get(checkBlockUser);    
router.route("/checkBlockCompany/:id").get(checkBlockCompany);    

router.route("/getAllJobs").get(getAllJobs);    
router.route("/deleteJob/:id").delete(deleteJob);    

export default router;

// for test 
// localhost:4000/api/admin/login
// localhost:4000/api/admin/register

// localhost:4000/api/admin/getAllUser
// localhost:4000/api/admin/blockUser/:id
// localhost:4000/api/admin/unblockUser/:id

// localhost:4000/api/admin/getAllCompany
// localhost:4000/api/admin/blockCompany/:id
// localhost:4000/api/admin/unblockCompany/:id

// localhost:4000/api/admin/checkBlockUser/:id
//  :id

// localhost:4000/api/admin/getAllJobs
// localhost:4000/api/admin/deleteJob/:id


