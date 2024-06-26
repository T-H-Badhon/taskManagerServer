import catchAsync from '../../utilities/catchAsync'
import { Request, Response } from 'express'
import response from '../../utilities/response'
import { userServices } from './users.sevices'

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body
  const result = await userServices.registerUser(userData)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  })
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginCredential = req.body

  const result = await userServices.loginUser(loginCredential)
  response(res, {
    success: true,
    statusCode: 200,
    message: 'User login successful',
    data: result,
  })
})

const allUsers = catchAsync(async (req: Request, res: Response) => {
  const query = req.query

  const result = await userServices.allUsers(query)
  response(res, {
    success: true,
    statusCode: 200,
    message: 'Users fetched successful',
    data: result,
  })
})

const oneUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.userId

  const result = await userServices.oneUser(id)
  response(res, {
    success: true,
    statusCode: 200,
    message: 'User fetched successful',
    data: result,
  })
})

const getMe = catchAsync(async (req: Request, res: Response) => {
  const id = req.user._id

  const result = await userServices.getMe(id)
  response(res, {
    success: true,
    statusCode: 200,
    message: 'User fetched successful',
    data: result,
  })
})
const updateMe = catchAsync(async (req: Request, res: Response) => {
  const id = req.user._id
  const updateData = req.body

  const result = await userServices.updateMe(id, updateData)
  response(res, {
    success: true,
    statusCode: 200,
    message: 'User updated successful',
    data: result,
  })
})
const deleteMe = catchAsync(async (req: Request, res: Response) => {
  const id = req.user._id

  const result = await userServices.deleteMe(id)
  response(res, {
    success: true,
    statusCode: 200,
    message: 'User deleted successful',
    data: result,
  })
})

export const userControllers = {
  registerUser,
  loginUser,
  allUsers,
  oneUser,
  getMe,
  updateMe,
  deleteMe,
}
