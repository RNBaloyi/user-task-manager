import { Database } from "sqlite";

export async function clearDatabase(db: Database) {
  const tables = ["users", "tasks"];
  for (const table of tables) {
    await db.run(`DELETE FROM ${table}`);
    await db.run(`DELETE FROM sqlite_sequence WHERE name='${table}'`);
  }
}
