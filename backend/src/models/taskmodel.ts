import { Database } from "sqlite";

export async function getTasksForUser(db: Database, userId: number) {
  return db.all("SELECT * FROM tasks WHERE userId = ?", userId);
}

export async function createTaskForUser(
  db: Database,
  userId: number,
  description: string
) {
  const result = await db.run(
    "INSERT INTO tasks (userId, description) VALUES (?, ?)",
    userId,
    description
  );
  return { id: result.lastID, userId, description };
}
