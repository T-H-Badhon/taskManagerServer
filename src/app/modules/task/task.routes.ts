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

router.get('/', taskControllers.allTasks)

router.get('/:taskId', taskControllers.oneTask)

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
