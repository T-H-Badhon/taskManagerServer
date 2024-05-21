import { Types } from 'mongoose'

export type TTask = {
  title: string
  description: string
  dueDate: Date
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  status: 'TO-DO' | 'IN-PROGRESS' | 'COMPLETED'
  taskDependencies: string[]
  categoryId: Types.ObjectId
  projectId: Types.ObjectId
  assignedEmployeeId: Types.ObjectId
  attachedFiles: string[]
  comments: string[]
}

export type TRequestDependency = {
  taskId: string
  isDeleted: boolean
}
export type TRequestfile = {
  fileLink: string
  isDeleted: boolean
}
