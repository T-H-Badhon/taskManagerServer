import catchAsync from '../../utilities/catchAsync'
import { Request, Response } from 'express'
import response from '../../utilities/response'
import { projectServices } from './project.services'

const addProject = catchAsync(async (req: Request, res: Response) => {
  const projectData = req.body
  const result = await projectServices.addProject(projectData)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'Project added successfully',
    data: result,
  })
})

const allProjects = catchAsync(async (req: Request, res: Response) => {
  const query = req.query

  const result = await projectServices.allProjects(query)

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
  deleteProject,
}
