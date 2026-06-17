import express from "express";
import {getAllJobs,getJobById,createJob,updateJob,deleteJob,getStats} from "../controllers/job.Controller.js";

const router = express.Router();

router
  .route("/")
  .get(getAllJobs)
  .post(createJob);

router
  .route("/stats")
  .get(getStats);

router
  .route("/:id")
  .get(getJobById)
  .put(updateJob)
  .delete(deleteJob);

export default router;