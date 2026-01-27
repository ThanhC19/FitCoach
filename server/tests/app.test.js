import request from 'supertest';
import { test, expect } from "vitest";
import app from '../app.js';

test("should return 404 and JSON for non-existent routes", async () => {
  const res = await request(app)
    .get('/madeup-route-whoopdeedoo')
    .expect("Content-Type", /json/)
    .expect(404);

  expect(res.body).toEqual({
    message: "Not Found"
  })

})