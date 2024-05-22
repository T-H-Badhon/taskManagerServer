import { Router } from 'express'
import { projectControllers } from './project.controllers'
import validate from '../../middlewares/ValidationFunction'
import {
  projectValidationSchema,
  updatedProjectValidationSchema,
} from './project.validationScema'
import auth from '../../middlewares/auth'

const router = Router()

router.post(
  '/add',
  auth('ADMIN', 'MANAGER'),
  validate(projectValidationSchema),
  projectControllers.addProject,
)

router.get('/', auth('ADMIN', 'MANAGER'), projectControllers.allProjects)

router.get(
  '/:projectId',
  auth('ADMIN', 'MANAGER', 'EMPLOYEE'),
  projectControllers.oneProject,
)

router.patch(
  '/update-status/:projectId',
  auth('ADMIN', 'MANAGER'),
  validate(updatedProjectValidationSchema),
  projectControllers.updateStatus,
)

router.delete(
  '/delete/:projectId',
  auth('ADMIN', 'MANAGER'),
  projectControllers.deleteProject,
)

export const projectRoutes = router
