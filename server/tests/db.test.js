
import { test, expect, vi, beforeEach } from "vitest";
import { connectDB, sequelize } from "../db.js";


// reset beforee each test:
beforeEach(() => {
  vi.clearAllMocks();
});


//happy path:

test("Should log success when connection is established", async () => {


  //arrange all mock setup
  const authenticateMock = vi.spyOn(sequelize, "authenticate").mockResolvedValue();
  const syncMock = vi.spyOn(sequelize, "sync").mockResolvedValue();
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => { });  //removes all console.logs from test

  // activate
  await connectDB();


  // look at result:

  expect(authenticateMock).toHaveBeenCalledTimes(1);
  expect(logSpy).toHaveBeenNthCalledWith(1, "Connection has been established successfully");
  expect(logSpy).toHaveBeenNthCalledWith(2, "models synchronized");

});

//sad path:

test('should log "DB connection failed" when Sequelize throws an error', async () => {

  // Arrange
  const error = new Error("Connection failed");
  const authenticateMock = vi.spyOn(sequelize, "authenticate").mockRejectedValue(error);
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => { }); //removes all console.logs from test

  // Act and look at result:
  await expect(connectDB()).rejects.toThrow("Connection failed");

  expect(authenticateMock).toHaveBeenCalledTimes(1);

  expect(logSpy).toHaveBeenCalledWith("DB connection failed", error);
})