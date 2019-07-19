import request from "supertest";
import { app } from "../app";

let token;
let article;

export async function getTestToken() {
  if (!token) {
    const res = await request(app.callback())
      .post("/v1/auth/token")
      .send({
        email: "example@example.com",
        password: "password",
        provider: "local"
      });

    token = res.body.token;
  }
  return token;
}

export const appCallback = app.callback();

export async function getTestArticle() {
  if (!article) {
    const token = await getTestToken();
    const res = await request(appCallback)
      .post("/v1/article")
      .set("x-access-token", token)
      .send({
        title: `Hello Test ${new Date().getTime()}`,
        contents: "Hello world"
      });
    article = res.body.id;
  }
  return article;
}
