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
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'category',
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'project',
    },
    assignedUserId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    taskDependencies: {
      type: [String],
      default: [],
    },
    attachedFiles: {
      type: [String],
      default: [],
    },
    comments: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  },
)

export const Task = mongoose.model('Task', taskSchema)
