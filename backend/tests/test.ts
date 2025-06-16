import request from "supertest";
import { Express } from "express";
import { Database } from "sqlite";
import { createApp } from "../src/app";
import { initDb } from "../src/utils/db";
import { clearDatabase } from "../src/utils/clearDatabase";

let app: Express;
let db: Database;

beforeAll(async () => {
  db = await initDb("./test-database.sqlite");
  app = await createApp("./test-database.sqlite");
});

beforeEach(async () => {
  await clearDatabase(db);
});

describe("User API", () => {
  it("should return empty users list initially", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("should not allow creating a user without name", async () => {
    const res = await request(app).post("/users").send({});
    expect(res.statusCode).toBe(400);
  });

  it("should create a user successfully", async () => {
    const res = await request(app).post("/users").send({ name: "rixo baloyi" });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("rixo baloyi");
  });

  it("should create a task for a user", async () => {
    const userRes = await request(app).post("/users").send({ name: "milano" });
    const userId = userRes.body.id;

    const taskRes = await request(app)
      .post(`/users/${userId}/tasks`)
      .send({ description: "Do something" });
    expect(taskRes.statusCode).toBe(201);
    expect(taskRes.body.description).toBe("Do something");
  });

  describe("User API Pagination, Sorting, Filtering", () => {
    beforeEach(async () => {
      // Clear DB and add sample users
      await clearDatabase(db);
      await db.run("INSERT INTO users (name) VALUES (?)", "Alice");
      await db.run("INSERT INTO users (name) VALUES (?)", "Bob");
      await db.run("INSERT INTO users (name) VALUES (?)", "Charlie");
      await db.run("INSERT INTO users (name) VALUES (?)", "David");
    });

    it("returns paginated users", async () => {
      const res = await request(app).get("/users?limit=2&page=1");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });

    it("returns users filtered by name", async () => {
      const res = await request(app).get("/users?name=ali");
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(
        res.body.every((u: any) => u.name.toLowerCase().includes("ali"))
      ).toBe(true);
    });

    it("returns users sorted by name desc", async () => {
      const res = await request(app).get("/users?sortBy=name&order=desc");
      expect(res.status).toBe(200);
      const names = res.body.map((u: any) => u.name);
      const sortedNames = [...names].sort().reverse();
      expect(names).toEqual(sortedNames);
    });
  });
});
