import express from "express";
import { applyJob, getApplicants, getAppliedJobs, getAppliedJobUsers, getAppliedJobCount, updateStatus } from "../controllers/application.controller.js";
import { singleUpload }from "../middlewares/multer.js";

const router = express.Router();

router.route("/applyJob/:id").post(singleUpload,applyJob);
router.route("/getApplications").get(getAppliedJobs);
router.route("/getApplicants/:id").get(getApplicants);
router.route("/updateStatus/:id").put(updateStatus);
router.route("/getAppliedJobUsers/:id").get(getAppliedJobUsers);
router.route("/getAppliedJobCount/:id").get(getAppliedJobCount);

// to test use
// localhost:4000/api/application/applyJob/:id
// localhost:4000/api/application/getApplications
// localhost:4000/api/application/getApplicants/:id
// localhost:4000/api/application/updateStatus/:id
// localhost:4000/api/application/getAppliedJobUsers/:id
// localhost:4000/api/application/getAppliedJobCount/:id

export default router;
