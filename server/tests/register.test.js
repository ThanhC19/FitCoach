// tests/registerUser.test.js
import { test, expect, beforeEach, vi } from "vitest";
import request from "supertest";
import { mockUsers } from "./mockData.js";

vi.mock("../db.js", () => { // do mock db before the app and user is imported since they rely on it
  return {
    User: {
      findOne: vi.fn(),
      create: vi.fn(),
    },
  };
});

import app from "../app.js";
import { User } from "../db.js";



beforeEach(() => {
  vi.clearAllMocks();
});


//happy path: registration works:

test("it shall succesfully create a new user", async () => {
  const newUsername = "Esbjorn_stark_the_Vast";
  const newPassword = "best_password_in_the_world";

  // Username not taken
  User.findOne.mockResolvedValue(null);

  // Simulate DB create
  User.create.mockResolvedValue({
    toJSON: () => ({
      UID: 99,
      username: newUsername,
      password: "hashed_pw",
    }),
  });

  const res = await request(app)
    .post("/register")
    .send({ username: newUsername, password: newPassword });

  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty("UID", 99);
  expect(res.body).toHaveProperty("username", newUsername);
  expect(res.body).not.toHaveProperty("password");

  expect(User.findOne).toHaveBeenCalledWith({
    where: { username: newUsername },
  });
  expect(User.create).toHaveBeenCalled();
});



// unhappy paths. two failure cases

//unhappy test 1:
test("it shall handle fails when username already exists (409)", async () => {
  const existingUser = mockUsers[0];

  // DB returns an existing user
  User.findOne.mockResolvedValue(existingUser);

  const res = await request(app)
    .post("/register")
    .send({ username: existingUser.username, password: "derpherphurrdurrblablabla" });

  expect(res.status).toBe(409);
  expect(res.body).toEqual({ message: "Username already exists" });

  expect(User.create).not.toHaveBeenCalled();
});

//unhappy test 2:

test("it shall handle fails when fields are missing (400)", async () => {
  const res = await request(app).post("/register").send({});

  expect(res.status).toBe(400);
  expect(res.body).toEqual({ message: "Username and password required" });

  expect(User.findOne).not.toHaveBeenCalled();
  expect(User.create).not.toHaveBeenCalled();
});
