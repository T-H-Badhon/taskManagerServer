import { Router } from 'express'
import { taskControllers } from './task.controllers'
import validate from '../../middlewares/ValidationFunction'
import { taskValitdations } from './task.validationSchema'
import auth from '../../middlewares/auth'

const router = Router()

router.post(
  '/add',
  auth(),
  validate(taskValitdations.taskValidationSchema),
  taskControllers.addTask,
)

router.get('/', auth(), taskControllers.allTasks)

router.get('/my-tasks', auth(), taskControllers.myTasks)

router.get('/:taskId', auth(), taskControllers.oneTask)

router.patch(
  '/update/my-task/:taskId',
  auth(),
  validate(taskValitdations.updateTaskValidationSchema),
  taskControllers.updateTask,
)

router.delete('/delete/my-task/:taskId', auth(), taskControllers.deleteTask)

export const taskRoutes = router
