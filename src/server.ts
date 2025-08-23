process.loadEnvFile(); // nueva funcionalidad
import express from "express";
import { router as taskRoute } from "./routes/taskRoute";

const app = express();

app.use(express.json());

app.use("/api/tasks", taskRoute);

export default app;
