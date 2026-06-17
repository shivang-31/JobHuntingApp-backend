import express from "express";
import {getAllJobs,getJobById,createJob,updateJob,deleteJob,getStats} from "../controllers/job.controller.js";

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