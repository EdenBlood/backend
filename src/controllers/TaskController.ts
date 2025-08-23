import { Request, Response } from "express";
import Task, { ITask } from "../models/Task";

interface createTaskBody {
  title: ITask["title"];
  description: ITask["description"];
}

interface getTaskByIdParams {
  taskId: ITask["id"];
}

interface updateTaskParams {
  taskId: ITask["id"];
}
interface updateTaskBody {
  title: ITask["title"];
  description: ITask["description"];
  completed: ITask["completed"];
}

interface deleteTaskParams {
  taskId: ITask["id"];
}

export class TaskController {
  static createTask = async (
    req: Request<{}, {}, createTaskBody, {}>,
    res: Response
  ) => {
    const { title, description } = req.body;

    const task: ITask = new Task({
      title,
      description,
    });

    try {
      await task.save();
    } catch (error) {
      const errorJson = new Error("Error al guardar la tarea");
      res.status(500).json({ error: errorJson.message });
      return;
    }

    res.status(201).json({ msg: "Tarea creada correctamente", task });
  };

  static getTasks = async (req: Request<{}, {}, {}, {}>, res: Response) => {
    let tasks: ITask[] = [];

    try {
      tasks = await Task.find({});
    } catch (error) {
      const errorJson = new Error("Error al obtener las tareas");
      res.status(500).json({ error: errorJson.message });
      return;
    }

    res.status(200).json({ msg: "Tareas encontradas", tasks: tasks });
  };

  static getTaskById = async (
    req: Request<getTaskByIdParams, {}, {}, {}>,
    res: Response
  ) => {
    const { taskId } = req.params;
    let task: ITask | null = null;

    try {
      task = await Task.findById(taskId);
    } catch (error) {
      const errorJson = new Error("Error al obtener la tarea");
      res.status(500).json({ error: errorJson.message });
      return;
    }

    if (!task) {
      const error = new Error("La tarea no existe");
      res.status(404).json({ error: error.message });
      return;
    }

    res.status(200).json({ msg: "Tarea encontrada", task });
  };

  static updateTask = async (
    req: Request<updateTaskParams, {}, updateTaskBody, {}>,
    res: Response
  ) => {
    const { taskId } = req.params;
    const { title, description, completed } = req.body;
    let task: ITask | null = null;

    //* traer la tarea
    try {
      task = await Task.findById(taskId);
    } catch (error) {
      const errorJson = new Error("Error al obtener la tarea");
      res.status(500).json({ error: errorJson.message });
      return;
    }

    if (!task) {
      const error = new Error("La tarea no existe");
      res.status(404).json({ error: error.message });
      return;
    }

    //* actualizar la información de la tarea
    task.description = description || task.description;
    task.title = title || task.title;
    task.completed = completed || task.completed;

    try {
      await task.save();
    } catch (error) {
      const errorJson = new Error("Error al guardar la tarea");
      res.status(500).json({ error: errorJson.message });
      return;
    }

    res.status(200).json({ msg: "Tarea actualizada correctamente", task });
  };

  static deleteTask = async (
    req: Request<deleteTaskParams, {}, {}, {}>,
    res: Response
  ) => {
    const { taskId } = req.params;

    let task: ITask | null = null;

    try {
      task = await Task.findById(taskId);
    } catch (error) {
      const errorJson = new Error("Error al obtener la tarea");
      res.status(500).json({ error: errorJson.message });
      return;
    }

    if (!task) {
      const error = new Error("La tarea no existe");
      res.status(404).json({ error: error.message });
      return;
    }

    try {
      await task.deleteOne();
    } catch (error) {
      const errorJson = new Error("Error al eliminar la tarea");
      res.status(500).json({ error: errorJson.message });
      return;
    }

    res.json({ msg: "Tarea eliminada correctamente" });
  };
}
