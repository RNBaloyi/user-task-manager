import { Database } from "sqlite";

export async function getUsers(db: Database) {
  return db.all("SELECT * FROM users");
}

export async function createUser(db: Database, name: string) {
  const result = await db.run("INSERT INTO users (name) VALUES (?)", name);
  return { id: result.lastID, name };
}
