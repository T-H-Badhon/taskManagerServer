import { Router } from 'express'
import { projectControllers } from './project.controllers'
import validate from '../../middlewares/ValidationFunction'
import { projectValidationSchema } from './project.validationScema'
import auth from '../../middlewares/auth'

const router = Router()

router.post(
  '/add',
  auth(),
  validate(projectValidationSchema),
  projectControllers.addProject,
)

router.get('/', auth(), projectControllers.allProjects)

router.get('/:projectId', auth(), projectControllers.oneProject)

router.patch(
  '/update-status/:projectId',
  auth(),

  projectControllers.updateStatus,
)
router.patch(
  '/update-joiningStatus/:projectId',
  auth(),

  projectControllers.updateJoiningStatus,
)
router.patch('/add-member/:projectId', auth(), projectControllers.addMember)
router.patch(
  '/remove-member/:projectId/:memberId',
  auth(),
  projectControllers.addMember,
)

router.delete('/delete/:projectId', auth(), projectControllers.deleteProject)

export const projectRoutes = router
