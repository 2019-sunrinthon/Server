import { model, Schema } from "mongoose";
import password from "../lib/password";

const schema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    set(pw) {
      return password(pw);
    }
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});
schema.methods.verifyPassword = function(pw) {
  if (password(pw) === this.password) {
    return true;
  }
  return false;
};

const User = model("User", schema);
if (process.env.NODE_ENV === "test") {
  new User({
    username: "test1",
    password: "password",
    email: "example@example.com",
    phoneNumber: "010-1234-5678",
    name: "홍길동",
    age: 20
  })
    .save()
    .catch(e => {});
}
export default User;
