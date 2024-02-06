import { InferSchemaType, Schema, model } from "mongoose";

const toDoSchema = new Schema(
  {
    userId: {type: Schema.Types.ObjectId, required: true},
    title: { type: String, required: true },
    text: { type: String },
    note: { type: String },
    completed: { type: Boolean },
  },
  { timestamps: true }
);

type ToDo = InferSchemaType<typeof toDoSchema>;

export default model<ToDo>("ToDo", toDoSchema);
