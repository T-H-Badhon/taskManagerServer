import { Router } from 'express'
import { taskControllers } from './task.controllers'
import validate from '../../middlewares/ValidationFunction'
import { taskValitdations } from './task.validationSchema'
import auth from '../../middlewares/auth'

const router = Router()

router.post(
  '/add',
  auth('ADMIN', 'MANAGER'),
  validate(taskValitdations.taskValidationSchema),
  taskControllers.addTask,
)

router.get('/', auth('ADMIN', 'MANAGER', 'EMPLOYEE'), taskControllers.allTasks)

router.get(
  '/:taskId',
  auth('ADMIN', 'MANAGER', 'EMPLOYEE'),
  taskControllers.oneTask,
)

router.patch(
  '/update/:taskId',
  auth('ADMIN', 'MANAGER'),
  validate(taskValitdations.updateTaskValidationSchema),
  taskControllers.updateTask,
)

router.delete(
  '/delete/:taskId',
  auth('ADMIN', 'MANAGER'),
  taskControllers.deleteTask,
)

export const taskRoutes = router
