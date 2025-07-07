import express from "express";
import { applyJob, getApplicants, getAppliedJobs, getAppliedJobUsers, updateStatus } from "../controllers/application.controller.js";

const router = express.Router();

router.route("/applyJob/:id").post(applyJob);
router.route("/getApplications").get(getAppliedJobs);
router.route("/getApplicants/:id").get(getApplicants);
router.route("/updateStatus/:id").put(updateStatus);
router.route("/getAppliedJobUsers/:id").get(getAppliedJobUsers);


// to test use
// localhost:4000/api/application/applyJob/:id
// localhost:4000/api/application/getApplications
// localhost:4000/api/application/getApplicants/:id
// localhost:4000/api/application/updateStatus/:id
// localhost:4000/api/application/getAppliedJobUsers/:id

export default router;
