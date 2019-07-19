import { Schema, model } from "mongoose";

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  lists: [
    {
      todo: String,
      completed: {
        type: Boolean,
        default: false
      }
    }
  ],
  by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

export default model("Todo", schema);
