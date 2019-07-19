import { getTestToken, appCallback } from "../../test/utils";
import request from "supertest";
describe("/v1/article", () => {
  describe("POST /v1/article", () => {
    it("can write article", async () => {
      const token = await getTestToken();
      const { status, body } = await request(appCallback)
        .post("/v1/article")
        .set("x-access-token", token)
        .send({ title: "Hello Test!", contents: "Article" });
      console.log(body);
      expect(status).toBe(201);
      expect(body.success).toBe(true);
    });
  });
  describe("GET /v1/article", () => {
    it("can read articles", async () => {
      const token = await getTestToken();
      const { status, body } = await request(appCallback)
        .get(`/v1/article?age=10`)
        .set("x-access-token", token);
      expect(status).toBe(200);
      expect(body.articles).not.toBeUndefined();
    });
  });
});
