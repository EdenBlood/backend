import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

export const router = Router();

//* CRUD
router.post("/", TaskController.createTask);

router.get("/", TaskController.getTasks);

router.get("/:taskId", TaskController.getTaskById);

router.put("/:taskId", TaskController.updateTask);

router.delete("/:taskId", TaskController.deleteTask);
