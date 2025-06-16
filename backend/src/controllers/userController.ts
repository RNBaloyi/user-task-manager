import { Request, Response } from "express";
import { Database } from "sqlite";
import * as userModel from "../models/userModel";
import * as taskModel from "../models/taskmodel";

export const getAllUsers = async (
  req: Request,
  res: Response,
  db: Database
) => {
  const users = await userModel.getUsers(db);
  res.json(users);
};

export const createUser = async (req: Request, res: Response, db: Database) => {
  const { name } = req.body;
  if (!name?.trim()) {
    res.status(400).json({ error: "Name is required and cannot be empty" });
    return;
  }
  const user = await userModel.createUser(db, name.trim());
  res.status(201).json(user);
};

export const getUserTasks = async (
  req: Request,
  res: Response,
  db: Database
) => {
  const userId = Number(req.params.id);
  const tasks = await taskModel.getTasksForUser(db, userId);
  res.json(tasks);
};

export const createUserTask = async (
  req: Request,
  res: Response,
  db: Database
) => {
  const userId = Number(req.params.id);
  const { description } = req.body;
  if (!description?.trim()) {
    res
      .status(400)
      .json({ error: "Task description is required and cannot be empty" });
    return;
  }
  const task = await taskModel.createTaskForUser(
    db,
    userId,
    description.trim()
  );
  res.status(201).json(task);
};
