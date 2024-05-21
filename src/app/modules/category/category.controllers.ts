import catchAsync from '../../utilities/catchAsync'
import { Request, Response } from 'express'
import response from '../../utilities/response'
import { categoryServices } from './category.services'

const addCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryData = req.body
  const result = await categoryServices.addCategory(categoryData)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'Category added successfully',
    data: result,
  })
})

const allCategories = catchAsync(async (req: Request, res: Response) => {
  const query = req.query

  const result = await categoryServices.allCategories(query)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'Categories fetched successfully',
    data: result,
  })
})

const oneCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.categoryId
  const result = await categoryServices.oneCategory(id)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'Category fetched successfully',
    data: result,
  })
})

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.categoryId
  const updateData = req.body
  const result = await categoryServices.updateCategory(id, updateData)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'Category updated successfully',
    data: result,
  })
})

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.categoryId

  const result = await categoryServices.deleteCategory(id)

  response(res, {
    success: true,
    statusCode: 200,
    message: 'Category deleted successful',
    data: result,
  })
})

export const categoryControllers = {
  addCategory,
  allCategories,
  oneCategory,
  updateCategory,
  deleteCategory,
}
