import express from 'express';
import { registerCompany, login, getAllCompanies, getCompany, updateCompany } from '../controllers/company.controller.js';

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(registerCompany);
router.route("/getallcompanies").get(getAllCompanies);
router.route("/getcompany/:id").get(getCompany);
router.route("/updatecompany/:id").put(updateCompany);


export default router;
