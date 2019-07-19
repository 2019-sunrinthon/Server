import { getTestToken, appCallback, getTestArticle } from "../../test/utils";
import request from "supertest";

describe("/v1/comment", () => {
  describe("POST /v1/article/:id/comment", () => {
    it("works without crash", async () => {
      const token = await getTestToken();
      const article = await getTestArticle();

      const { status, body } = await request(appCallback)
        .post(`/v1/article/${article}/comment`)
        .set("x-access-token", token)
        .send({ contents: `hello ${new Date().getTime()}` });

      expect(status).toBe(201);
      expect(body.success).toBe(true);
    });
  });
  describe("GET /v1/article/:id/comment", () => {
    it("works without crash", async () => {
      const article = await getTestArticle();

      const { status, body } = await request(appCallback).get(
        `/v1/article/${article}/comment`
      );

      expect(status).toBe(200);
      expect(body.success).toBe(true);
    });
  });
});
