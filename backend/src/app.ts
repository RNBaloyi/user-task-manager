import express from "express";
import cors from "cors";
import userRoutes from "./routes/users";
import { initDb } from "./utils/db";

export async function createApp(dbFile = "./database.sqlite") {
  const db = await initDb(dbFile);
  const app = express();

  app.use(cors({ origin: "http://localhost:5173" }));
  app.use(express.json());
  app.use("/users", userRoutes(db));

  return app;
}
