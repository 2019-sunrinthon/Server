import { Schema, model } from "mongoose";

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  contents: {
    type: String,
    required: true
  },
  by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

export default model("Article", schema);
