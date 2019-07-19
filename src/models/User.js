import { model, Schema } from "mongoose";
import password from "../lib/password";

const schema = new Schema({
  username: {
    type: String,
    unique: true,
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
schema.methods.verifyPassword = pw => {
  if (password(pw) === this.password) {
    return true;
  }
  return false;
};
export default model("User", schema);
