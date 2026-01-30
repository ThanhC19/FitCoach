import request from "supertest";
import bcrypt from "bcrypt";
import { beforeEach, expect, test, vi } from "vitest";
import { testUser } from "./mockData.js";
import { User } from "../db.js";
import app from "../app.js";

beforeEach(() => {
  vi.restoreAllMocks();
});

// happy path: successfully login
test("should return the username on successful login", async () => {
  const user = testUser;
  const hash = await bcrypt.hash(user.password, 10);

  vi.spyOn(User, "findOne").mockResolvedValueOnce({
    username: testUser.username,
    password: hash,
  });

  const res = await request(app)
    .post("/login")
    .send(user)
    .expect("Content-Type", /text/);

  expect(res.status).toBe(200);
  expect(res.text).toBe(testUser.username);
});

// unhappy path
test("should return 400 when username or password is missing", async () => {
  const res = await request(app)
    .post("/login")
    .send({ username: testUser.username }) // password missing
    .expect("Content-Type", /json/);

  expect(res.status).toBe(400);
  expect(res.body.message).toBe("Username and password required");
});

test("should return 401 when user is not found", async () => {
  // DB sends back null
  vi.spyOn(User, "findOne").mockResolvedValueOnce(null);

  const res = await request(app)
    .post("/login")
    .send({ username: testUser.username, password: testUser.password })
    .expect("Content-Type", /json/);

  expect(res.status).toBe(401);
  expect(res.body.message).toBe("Invalid credentials");
});

test("should return 401 when password is incorrect", async () => {
  const hash = await bcrypt.hash(testUser.password, 10);

  vi.spyOn(User, "findOne").mockResolvedValueOnce({
    username: testUser.username,
    password: hash,
  });

  const res = await request(app)
    .post("/login")
    .send({ username: testUser.username, password: "wrong-password" }) // send a wrong password
    .expect("Content-Type", /json/);

  expect(res.status).toBe(401);
  expect(res.body.message).toBe("Invalid credentials");
});
