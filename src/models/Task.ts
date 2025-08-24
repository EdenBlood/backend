import mongoose, { Schema, Types, Document } from "mongoose";

export const statusTypes = {
  COMPLETED: "completed",
  IN_PROGRESS: "inProgress",
  NOT_STARTED: "notStarted",
} as const;

export type StatusTypes = (typeof statusTypes)[keyof typeof statusTypes];

export interface ITask extends Document {
  id: Types.ObjectId;
  title: string;
  description: string;
  status: StatusTypes;
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

    status: {
      type: String,
      enum: Object.values(statusTypes),
      default: statusTypes.NOT_STARTED,
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
