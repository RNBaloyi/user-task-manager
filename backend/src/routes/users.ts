import { Router, Request, Response } from "express";
import { Database } from "sqlite";

export default function userRoutes(db: Database) {
  const router = Router();

  // Create user
  router.post("/", async (req: Request, res: Response): Promise<any> => {
    const { name } = req.body;
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Name is required" });
    }
    try {
      const result = await db.run(
        "INSERT INTO users (name) VALUES (?)",
        name.trim()
      );
      const user = await db.get(
        "SELECT * FROM users WHERE id = ?",
        result.lastID
      );
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Get users with pagination, sorting, filtering
  router.get("/", async (req: Request, res: Response): Promise<any> => {
    const {
      page = "1",
      limit = "10",
      sortBy = "id",
      order = "asc",
      name,
    } = req.query;

    const pageNum = Math.max(parseInt(page as string, 10), 1);
    const limitNum = Math.min(Math.max(parseInt(limit as string, 10), 1), 100);
    const orderDir =
      (order as string).toLowerCase() === "desc" ? "DESC" : "ASC";

    const sortableFields = ["id", "name"];
    const sortField = sortableFields.includes(sortBy as string) ? sortBy : "id";

    let sql = "SELECT * FROM users";
    const params: any[] = [];

    if (name && typeof name === "string") {
      sql += " WHERE name LIKE ?";
      params.push(`%${name}%`);
    }

    sql += ` ORDER BY ${sortField} ${orderDir} LIMIT ? OFFSET ?`;
    params.push(limitNum, (pageNum - 1) * limitNum);

    try {
      const users = await db.all(sql, params);
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Add task to a specific user
  router.post(
    "/:id/tasks",
    async (req: Request, res: Response): Promise<any> => {
      const { description } = req.body;
      const userId = parseInt(req.params.id, 10);

      if (
        !description ||
        typeof description !== "string" ||
        description.trim() === ""
      ) {
        return res.status(400).json({ error: "Task description is required" });
      }

      try {
        const result = await db.run(
          "INSERT INTO tasks (userId, description) VALUES (?, ?)",
          userId,
          description.trim()
        );

        const task = await db.get(
          "SELECT * FROM tasks WHERE id = ?",
          result.lastID
        );
        return res.status(201).json(task);
      } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );

  // Get tasks for a specific user with pagination and sorting
  router.get(
    "/:id/tasks",
    async (req: Request, res: Response): Promise<any> => {
      const userId = parseInt(req.params.id, 10);
      const {
        page = "1",
        limit = "10",
        sortBy = "id",
        order = "asc",
      } = req.query;

      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const pageNum = Math.max(parseInt(page as string, 10), 1);
      const limitNum = Math.min(
        Math.max(parseInt(limit as string, 10), 1),
        100
      );
      const orderDir =
        (order as string).toLowerCase() === "desc" ? "DESC" : "ASC";

      const sortableFields = ["id", "description"];
      const sortField = sortableFields.includes(sortBy as string)
        ? sortBy
        : "id";

      const offset = (pageNum - 1) * limitNum;

      try {
        const tasks = await db.all(
          `SELECT * FROM tasks WHERE userId = ? ORDER BY ${sortField} ${orderDir} LIMIT ? OFFSET ?`,
          userId,
          limitNum,
          offset
        );
        return res.json(tasks);
      } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );

  return router;
}
