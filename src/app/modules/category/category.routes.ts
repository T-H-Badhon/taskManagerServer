import { Router } from 'express'
import validate from '../../middlewares/ValidationFunction'

import auth from '../../middlewares/auth'
import { categoryValidationSchema } from './category.validation'
import { categoryControllers } from './category.controllers'

const router = Router()

router.post(
  '/add',
  auth('ADMIN', 'MANAGER'),
  validate(categoryValidationSchema),
  categoryControllers.addCategory,
)

router.get('/', categoryControllers.allCategories)

router.get('/:categoryId', categoryControllers.oneCategory)

router.patch(
  '/update-status/:categoryId',
  auth('ADMIN', 'MANAGER'),
  validate(categoryValidationSchema),
  categoryControllers.updateCategory,
)

router.delete(
  '/delete/:categoryId',
  auth('ADMIN', 'MANAGER'),
  categoryControllers.deleteCategory,
)

export const categoryRoutes = router
