import request from "supertest";
import { code } from "../../lib/errors";
import { app } from "../../app";

describe("User CR", () => {
  const t = new Date().getTime();
  describe("POST /v1/user", () => {
    function req(username, password, email, name, phoneNumber, age) {
      return request(app.callback())
        .post("/v1/user")
        .send({ username, password, email, name, phoneNumber, age });
    }
    it("runs without crash", async () => {
      const res = await req(
        `test${t}`,
        "awesome-password",
        `test${t}@gmail.com`,
        "홍길동",
        `010-${t}`,
        18
      );
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
    });
    it("catches required error", async () => {
      const res = await req();
      expect(res.status).toBe(400);
      expect(res.body.error_type).toBe(code.NO_REQUIRED_ITEMS);
    });
    it("catches unique error", async () => {
      const res = await req(
        `test${t}`,
        "awesome-password",
        `test${t}@gmail.com`,
        "홍길동",
        `010-${t}`,
        18
      );
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error_type).toBe(code.UNIQUE_ERROR);
    });
  });
  describe("GET /v1/user", () => {});
});
