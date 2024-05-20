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

const deleteProject = async (id: string) => {
  const result = await Project.deleteOne({ _id: id })

  return result
}

export const projectServices = {
  addProject,
  deleteProject,
}
