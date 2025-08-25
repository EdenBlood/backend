process.loadEnvFile(); // nueva funcionalidad
import express from "express";
import { router as taskRoute } from "./routes/taskRoute";
import cors, { CorsOptions } from "cors";

const app = express();

app.use(express.json());

const whiteList = [process.env.FRONTEND_URL || "http://localhost:5173"];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS: El origen no está permitido"));
    }
  },
  // credentials: true, //* 👈 Esto permite que el navegador envíe cookies
};

app.use(cors(corsOptions));

app.use("/api/tasks", taskRoute);

export default app;
