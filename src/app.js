import express from "express";
import jobRoutes from "./routes/job.route.js";
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/jobs", jobRoutes);
// app.use("/api/v1/users", userRouter);

export { app };