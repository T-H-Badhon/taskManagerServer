import { Types } from 'mongoose'

export type TProject = {
  projectName: string
  createdBy: Types.ObjectId
  members: [string]
  isOpenJoining: boolean
  isCompleted: boolean
}
