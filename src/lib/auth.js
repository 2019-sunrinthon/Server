import jwt from "jsonwebtoken";

const secret = process.env.JWT_TOKEN || "awesome_token"; // DO NOT USE THIS SECRET KEY!!

export function makeToken({
  provider = "local",
  name,
  email,
  phoneNumber,
  username,
  age
}) {
  return jwt.sign(
    {
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
