import express from "express";
import cors from "cors";
import jobRoutes from "./routes/job.route.js";

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://job-hunting-app-frontend-rho.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/jobs", jobRoutes);

export { app };