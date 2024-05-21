import httpStatus from 'http-status'
import { AppError } from '../../errors/AppError'
import { Category } from './category.model'
import { TCategory } from './category.interface'

const addCategory = async (categoryData: TCategory) => {
  const category = await Category.create(categoryData)
  if (!category) {
    throw new AppError(
      httpStatus.FAILED_DEPENDENCY,
      'category creation failed!',
    )
  }
  return category
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const allCategories = async (query: Record<string, unknown>) => {
  let filter = {}
  if (query?.searchTerm) {
    filter = { categoryName: { $regex: query.searchTerm, $options: 'i' } }
  }
  const categories = await Category.find(filter)

  return categories
}

const oneCategory = async (id: string) => {
  const project = await Category.findById({ _id: id })

  return project
}

const updateCategory = async (id: string, updateData: TCategory) => {
  const category = await Category.findById({ _id: id })

  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'category not found')
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    { _id: category._id },
    updateData,
    { new: true },
  )

  return updatedCategory
}

const deleteCategory = async (id: string) => {
  const result = await Category.deleteOne({ _id: id })

  return result
}

export const categoryServices = {
  addCategory,
  allCategories,
  oneCategory,
  updateCategory,
  deleteCategory,
}
