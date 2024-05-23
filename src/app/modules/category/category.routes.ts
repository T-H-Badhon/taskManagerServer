import { Router } from 'express'
import validate from '../../middlewares/ValidationFunction'

import auth from '../../middlewares/auth'
import { categoryValidationSchema } from './category.validation'
import { categoryControllers } from './category.controllers'

const router = Router()

router.post(
  '/add',
  auth(),
  validate(categoryValidationSchema),
  categoryControllers.addCategory,
)

router.get('/', auth(), categoryControllers.allCategories)

router.get('/:categoryId', auth(), categoryControllers.oneCategory)

router.patch(
  '/update/:categoryId',
  auth(),
  validate(categoryValidationSchema),
  categoryControllers.updateCategory,
)

router.delete('/delete/:categoryId', auth(), categoryControllers.deleteCategory)

export const categoryRoutes = router
