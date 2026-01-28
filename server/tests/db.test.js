
import { test, expect, vi, beforeEach } from "vitest";
import { connectDB, sequelize } from "../db.js";


// reset beforee each test:
beforeEach(() => {
  vi.clearAllMocks();
});


//happy path:

test("Should log success when connection is established", async () => {

})