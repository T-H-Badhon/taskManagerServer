import { Router } from 'express'
import validate from '../../middlewares/ValidationFunction'
import { userValitdations } from './users.validation'
import { userControllers } from './users.controllers'
import auth from '../../middlewares/auth'

const router = Router()

router.post(
  '/register',
  auth('ADMIN'),
  validate(userValitdations.userValidationSchema),
  userControllers.registerUser,
)
router.post(
  '/login',
  validate(userValitdations.loginCredentialValidationSchema),
  userControllers.loginUser,
)

router.get('/', auth('ADMIN', 'MANAGER'), userControllers.allUsers)

router.get('/:userId', auth('ADMIN', 'MANAGER'), userControllers.oneUser)

router.delete('/:userId', auth('ADMIN', 'MANAGER'), userControllers.deleteUser)

export const userRoutes = router
