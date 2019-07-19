import crypto from "crypto";

const key = process.env.SALT_KEY || "cR1pB0voC6der1gdHwGW7MwbGmbBmJdpiIQhSYcf";

module.exports = pw => {
  return crypto
    .pbkdf2Sync(pw, key.toString("base64"), 100000, 64, "sha512")
    .toString("base64");
};
