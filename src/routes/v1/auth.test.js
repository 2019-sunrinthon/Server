import { verifyToken, makeToken } from "../../lib/auth";
import { app } from "../../app";
import request from "supertest";

describe("/v1/token", () => {
  describe("POST /v1/auth/token", () => {
    it("can make and verify token", async () => {
      const payload = {
        provider: "local",
        name: "Kim",
        email: "doyeong@gmail.com",
        phoneNumber: "010-1234-5678",
        username: "Kim",
        age: 17
      };
      const token = verifyToken(makeToken(payload));
      expect(token).toMatchObject(payload);
    });
    it("can generate token in http request", async () => {
      const { body, status } = await request(app.callback())
        .post("/v1/auth/token")
        .send({
          provider: "local",
          email: "example@example.com",
          password: "password"
        });

      expect(status).toBe(201);
      expect(body.success).toBe(true);
      expect(body.token).not.toBeUndefined();
    });
  });
});
