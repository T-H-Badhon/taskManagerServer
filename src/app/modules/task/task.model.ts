import mongoose, { Schema } from 'mongoose'
import { TTask } from './task.interface'

const taskSchema = new Schema<TTask>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: ['HIGH', 'MEDIUM', 'LOW'],
      required: true,
    },
    status: {
      type: String,
      enum: ['TO-DO', 'IN-PROGRESS', 'COMPLETED'],
      default: 'TO-DO',
    },
    taskDependencis: {
      type: [String],
      default: [],
    },
    projectId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'project',
    },
    assignedEmployeeId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    attachedFiles: {
      type: [String],
      default: [],
    },
    comments: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
)

export const Task = mongoose.model('Task', taskSchema)
