import express from "express";
import { createJob } from "../controllers/job.controller.js";
import { getAllJobs } from "../controllers/job.controller.js";
import { getJobByCompany } from "../controllers/job.controller.js";
import { updateJob } from "../controllers/job.controller.js";
import { getJobById } from "../controllers/job.controller.js";
import { deleteJob } from "../controllers/job.controller.js";
import { getJobCountByCompanyId } from "../controllers/job.controller.js";
import { getAllJobCount } from "../controllers/job.controller.js";
import { getJobCountByDepartment } from "../controllers/job.controller.js";
import { saveJob } from "../controllers/job.controller.js";
import { getSavedJob } from "../controllers/job.controller.js";
import { checkSavedJob } from "../controllers/job.controller.js";
import { getAllJobsCountByCompany } from "../controllers/job.controller.js";
import { getLatestJobs } from "../controllers/job.controller.js";
import { getSemanticRecommendations } from "../controllers/job.controller.js";
// import { getJobRecommendations } from "../controllers/job.controller.js";
const router = express.Router();

router.route("/createJob").post(createJob);
router.route("/getalljobs").get(getAllJobs);
router.route("/getlatestjobs").get(getLatestJobs);
router.route("/getalljobcount").get(getAllJobCount);
router.route("/getjobbycompany/:id").get(getJobByCompany);
router.route("/updatejob/:id").put(updateJob);
router.route("/getjobbyid/:id").get(getJobById);
router.route("/deletejob/:id").delete(deleteJob);
router.route("/getjobcount/:id").get(getJobCountByCompanyId);
router.route("/getjobcountbydepartment").get(getJobCountByDepartment);
router.route("/savejob").post(saveJob);
router.route("/getsavedjob/:id").get(getSavedJob);
router.route("/checksavedjob/:id/:jobId").get(checkSavedJob);
router.route("/getalljobscountbycompany").get(getAllJobsCountByCompany);
router.route("/semanticrecommendations/:id").get(getSemanticRecommendations);
// router.route("/getjobrecommendations/:id").get(getJobRecommendations);

// to test use
// localhost:4000/api/job/createJob
// localhost:4000/api/job/getalljobs
// localhost:4000/api/job/getlatestjobs
// localhost:4000/api/job/getalljobcount
// localhost:4000/api/job/getjobbycompany/:id
// localhost:4000/api/job/updatejob/:id
// localhost:4000/api/job/getjobbyid/:id
// localhost:4000/api/job/deletejob/:id
// localhost:4000/api/job/getjobcount/:id
// localhost:4000/api/job/getjobcountbydepartment
// localhost:4000/api/job/savejob
// localhost:4000/api/job/getsavedjob/:id
// localhost:4000/api/job/checksavedjob/:id
// localhost:4000/api/job/getalljobscountbycompany
// localhost:4000/api/job/semanticrecommendations/:id
// localhost:4000/api/job/getjobrecommendations/:id

export default router;