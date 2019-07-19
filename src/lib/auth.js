import jwt from "jsonwebtoken";
import { throwError, code } from "./errors";

const secret = process.env.JWT_TOKEN || "awesome_token"; // DO NOT USE THIS SECRET KEY!!

export function makeToken({
  provider = "local",
  name,
  email,
  phoneNumber,
  username,
  age,
  _id
}) {
  return jwt.sign(
    {
      _id,
      provider,
      name,
      email,
      phoneNumber,
      username,
      age
    },
    secret,
    { expiresIn: "5d" }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, secret);
}

export async function authMiddleware(ctx, next) {
  const token = ctx.headers["x-access-token"];
  if (!token) {
    return throwError(code.INVAILD_TOKEN);
  }
  try {
    ctx.state.user = verifyToken(token);
  } catch (e) {
    throwError(code.INVAILD_TOKEN);
  }
  await next();
}
