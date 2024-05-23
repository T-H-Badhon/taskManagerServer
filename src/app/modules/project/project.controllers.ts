import catchAsync from '../../utilities/catchAsync'
import { Request, Response } from 'express'
import response from '../../utilities/response'
import { projectServices } from './project.services'

const addProject = catchAsync(async (req: Request, res: Response) => {
  const projectData = req.body
  const userId = req.user._id
  const result = await projectServices.addProject(userId, projectData)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'Project added successfully',
    data: result,
  })
})

const allProjects = catchAsync(async (req: Request, res: Response) => {
  const query = req.query
  const userId = req.user._id

  const result = await projectServices.allProjects(userId, query)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'Projects fetched successfully',
    data: result,
  })
})

const oneProject = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.projectId
  const result = await projectServices.oneProject(id)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'Project fetched successfully',
    data: result,
  })
})

const updateStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.projectId
  const result = await projectServices.updateStatus(id)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'Project status changed successfully',
    data: result,
  })
})

const updateJoiningStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.projectId
  const result = await projectServices.updateJoiningStatus(id)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'Project joining status changed successfully',
    data: result,
  })
})

const addMember = catchAsync(async (req: Request, res: Response) => {
  const projectId = req.params.projectId
  const memberId = req.user._id
  const result = await projectServices.addMember(projectId, memberId)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'Member added successfully',
    data: result,
  })
})
const removeMember = catchAsync(async (req: Request, res: Response) => {
  const projectId = req.params.projectId
  const memberId = req.params.memberId
  const userId = req.user._id
  const result = await projectServices.removeMember(userId, projectId, memberId)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'Member removed successfully',
    data: result,
  })
})

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.projectId

  const result = await projectServices.deleteProject(id)

  response(res, {
    success: true,
    statusCode: 200,
    message: 'Project deleted successful',
    data: result,
  })
})

export const projectControllers = {
  addProject,
  allProjects,
  oneProject,
  updateStatus,
  updateJoiningStatus,
  addMember,
  removeMember,
  deleteProject,
}
