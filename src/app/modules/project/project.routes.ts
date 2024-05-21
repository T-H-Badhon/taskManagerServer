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

router.get('/', projectControllers.allProjects)

router.get('/:projectId', projectControllers.oneProject)

router.patch(
  '/:projectId',
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
