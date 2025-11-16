import express from 'express';
import { registerCompany, login, getAllCompanies, getCompany, updateCompany, deleteCompany, getDeletedJobsByCompanyId, getAllCompanyCount } from '../controllers/company.controller.js';
import { singleUpload } from '../middlewares/multer.js';

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(singleUpload,registerCompany);
router.route("/getallcompanies").get(getAllCompanies);
router.route("/getcompany/:id").get(getCompany);
router.route("/updatecompany/:id").put(singleUpload,updateCompany);
router.route("/deletecompany/:id").delete(deleteCompany);
router.route("/getdeletedjobs/:id").get(getDeletedJobsByCompanyId); 
router.route("/getallcompanycount").get(getAllCompanyCount); 

// for testing
// localhost:4000/api/company/login
// localhost:4000/api/company/register
// localhost:4000/api/company/getallcompanies
// localhost:4000/api/company/getcompany/:id
// localhost:4000/api/company/updatecompany/:id
// localhost:4000/api/company/deletecompany/:id
// localhost:4000/api/company/getdeletedjobs/:id
// localhost:4000/api/company/getallcompanycount




export default router;
