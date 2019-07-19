import request from "supertest";
import { app } from "../app";

export async function getTestToken() {
  const res = await request(app.callback())
    .post("/v1/auth/token")
    .send({
      email: "example@example.com",
      password: "password",
      provider: "local"
    });
  return res.body.token;
}

export const appCallback = app.callback();
