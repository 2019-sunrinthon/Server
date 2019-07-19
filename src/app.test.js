import request from "supertest";
import { app } from "./app";
import { code } from "./lib/errors";

describe("App", () => {
  it("handles 404 error", async () => {
    const { body, status } = await request(app.callback()).get("/not-exist");
    expect(status).toBe(404);
    expect(body.error_type).toBe(code.NOT_FOUND);
    expect(body.success).toBe(false);
  });
});
