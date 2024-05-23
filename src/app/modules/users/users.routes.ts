import { Router } from 'express'
import validate from '../../middlewares/ValidationFunction'
import { userValitdations } from './users.validation'
import { userControllers } from './users.controllers'
import auth from '../../middlewares/auth'

const router = Router()

router.post(
  '/register',
  validate(userValitdations.userValidationSchema),
  userControllers.registerUser,
)
router.post(
  '/login',
  validate(userValitdations.loginCredentialValidationSchema),
  userControllers.loginUser,
)

router.get('/', userControllers.allUsers)

router.get('/me', auth(), userControllers.getMe)

router.get('/:userId', userControllers.oneUser)

router.patch('/me', auth())

router.delete('/me', auth(), userControllers.deleteMe)

export const userRoutes = router
