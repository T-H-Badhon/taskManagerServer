import catchAsync from '../../utilities/catchAsync'
import { Request, Response } from 'express'
import response from '../../utilities/response'
import { taskServices } from './task.services'

const addTask = catchAsync(async (req: Request, res: Response) => {
  const taskData = req.body
  const result = await taskServices.addTask(taskData)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'Task added successfully',
    data: result,
  })
})

const allTasks = catchAsync(async (req: Request, res: Response) => {
  const query = req.query

  const result = await taskServices.allTasks(query)
  response(res, {
    success: true,
    statusCode: 200,
    message: 'Tasks fetched successful',
    data: result,
  })
})

const oneTask = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.taskId

  const result = await taskServices.oneTask(id)
  response(res, {
    success: true,
    statusCode: 200,
    message: 'Task fetched successful',
    data: result,
  })
})

const updateTask = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.taskId

  const updateData = req.body

  const result = await taskServices.updateTask(id, updateData)
  response(res, {
    success: true,
    statusCode: 200,
    message: 'Task updated successful',
    data: result,
  })
})
const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.taskId

  const result = await taskServices.deleteTask(id)
  response(res, {
    success: true,
    statusCode: 200,
    message: 'Task deleted successful',
    data: result,
  })
})

export const taskControllers = {
  addTask,
  allTasks,
  oneTask,
  updateTask,
  deleteTask,
}
