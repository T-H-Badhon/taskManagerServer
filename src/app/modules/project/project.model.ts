import mongoose, { Schema } from 'mongoose'
import { TProject } from './project.interface'

const projectSchema = new Schema<TProject>({
  projectName: {
    type: String,
    required: true,
  },
})

export const Project = mongoose.model('project', projectSchema)
