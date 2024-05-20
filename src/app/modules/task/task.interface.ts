import { Types } from 'mongoose'

export type TTask = {
  title: string
  description: string
  dueDate: Date
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  status: 'TO-DO' | 'IN-PROGRESS' | 'COMPLETED'
  taskDependencis: string[]
  projectId: Types.ObjectId
  assignedEmployeeId: Types.ObjectId
  attachedFiles: string[]
  comments: string[]
}
