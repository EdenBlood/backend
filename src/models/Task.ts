import mongoose, { Schema, Types, Document } from "mongoose";

export interface ITask extends Document {
  id: Types.ObjectId;
  title: string;
  description: string;
  completed: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },

    description: {
      type: String,
      require: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
