import { Router } from 'express'
import { projectControllers } from './project.controllers'
import validate from '../../middlewares/ValidationFunction'
import { projectValidationSchema } from './project.validationScema'

const router = Router()

router.post(
  '/add',
  validate(projectValidationSchema),
  projectControllers.addProject,
)

router.get('/', projectControllers.allProjects)

router.get('/:projectId', projectControllers.oneProject)

router.patch('/:projectId', projectControllers.updateStatus)

router.delete('/delete', projectControllers.deleteProject)

export const projectRoutes = router
