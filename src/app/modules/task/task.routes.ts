import { Router } from 'express'
import { taskControllers } from './task.controllers'
import validate from '../../middlewares/ValidationFunction'
import { taskValitdations } from './task.validationSchema'

const router = Router()

router.post(
  '/add',
  validate(taskValitdations.taskValidationSchema),
  taskControllers.addTask,
)

router.get('/', taskControllers.allTasks)

router.get('/:taskId', taskControllers.oneTask)

router.patch(
  '/update/:taskId',
  validate(taskValitdations.updateTaskValidationSchema),
  taskControllers.updateTask,
)

router.delete('/delete/:taskId', taskControllers.deleteTask)
