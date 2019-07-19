import { Schema, model } from "mongoose";

const schema = new Schema({
  contents: {
    type: String,
    required: true
  },
  by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  adopted: {
    type: Boolean,
    default: false
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article",
    required: true
  }
});

export default model("Comment", schema);
