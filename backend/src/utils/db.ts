import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

export async function initDb(
  filename = "./database.sqlite"
): Promise<Database> {
  const db = await open({
    filename,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      description TEXT NOT NULL,
      FOREIGN KEY(userId) REFERENCES users(id)
    );
  `);

  return db;
}
