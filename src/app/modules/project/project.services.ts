import httpStatus from 'http-status'
import { AppError } from '../../errors/AppError'
import { TProject } from './project.interface'
import { Project } from './project.model'

const addProject = async (projectData: TProject) => {
  const project = await Project.create(projectData)
  if (!project) {
    throw new AppError(httpStatus.FAILED_DEPENDENCY, 'project creation failed!')
  }
  return project
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const allProjects = async (query: any) => {
  const projects = await Project.find(query)

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

const deleteProject = async (id: string) => {
  const result = await Project.deleteOne({ _id: id })

  return result
}

export const projectServices = {
  addProject,
  allProjects,
  oneProject,
  updateStatus,
  deleteProject,
}
