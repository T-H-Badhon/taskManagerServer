import httpStatus from 'http-status'
import { AppError } from '../../errors/AppError'
import { TProject } from './project.interface'
import { Project } from './project.model'
import { Types } from 'mongoose'

const addProject = async (userId: Types.ObjectId, projectData: TProject) => {
  projectData.createdBy = userId

  projectData.members.push(userId.toString())

  const project = await Project.create(projectData)
  if (!project) {
    throw new AppError(httpStatus.FAILED_DEPENDENCY, 'project creation failed!')
  }
  return project
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const allProjects = async (userId: string, query: any) => {
  let filter = {}
  if (query?.searchTerm) {
    filter = {
      projectName: { $regex: query.searchTerm, $options: 'i' },
      members: { $in: [userId] },
    }
  }
  const projects = await Project.find(filter)

  return projects
}

const oneProject = async (id: string) => {
  const project = await Project.findById({ _id: id })

  return project
}

const updateStatus = async (id: string) => {
  const project = await Project.findById({ _id: id })

  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, 'project not found')
  }

  const updatedProject = await Project.findByIdAndUpdate(
    { _id: project._id },
    { isCompleted: !project.isCompleted },
    { new: true },
  )

  return updatedProject
}
const updateJoiningStatus = async (id: string) => {
  const project = await Project.findById({ _id: id })

  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, 'project not found')
  }

  const updatedProject = await Project.findByIdAndUpdate(
    { _id: project._id },
    { isOpenJoining: !project.isOpenJoining },
    { new: true },
  )

  return updatedProject
}

const addMember = async (projectId: string, memberId: string) => {
  const project = await Project.updateOne(
    { _id: projectId },
    { $push: { members: memberId } },
    { new: true },
  )

  if (!project) {
    throw new AppError(httpStatus.FAILED_DEPENDENCY, 'add member failed')
  }
  return
}

const removeMember = async (
  userId: Types.ObjectId,
  projectId: string,
  memberId: string,
) => {
  const project = await Project.findById({ _id: projectId })

  if (project?.createdBy != userId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'you are unauthorized to delete member',
    )
  }
  const removedMembers = await Project.updateOne(
    { _id: projectId },
    { $push: { members: memberId } },
    { new: true },
  )

  if (!removedMembers) {
    throw new AppError(httpStatus.FAILED_DEPENDENCY, ' member removal failed')
  }
  return
}

const deleteProject = async (id: string) => {
  const result = await Project.deleteOne({ _id: id })

  return result
}

export const projectServices = {
  addProject,
  allProjects,
  oneProject,
  updateStatus,
  updateJoiningStatus,
  addMember,
  removeMember,
  deleteProject,
}
