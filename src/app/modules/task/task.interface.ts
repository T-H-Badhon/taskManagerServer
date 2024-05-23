import { Types } from 'mongoose'

export type TTask = {
  title: string
  description: string
  dueDate: Date
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  status: 'TO-DO' | 'IN-PROGRESS' | 'COMPLETED'
  categoryId?: Types.ObjectId
  projectId?: Types.ObjectId
  assignedUserId?: Types.ObjectId
  taskDependencies: string[]
  attachedFiles: string[]
  comments: string[]
  createdBy: Types.ObjectId
}

export type TRequestDependency = {
  taskId: string
  isDeleted: boolean
}
export type TRequestfile = {
  fileLink: string
  isDeleted: boolean
}
