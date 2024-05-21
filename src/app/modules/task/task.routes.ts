import { Router } from 'express'
import { taskControllers } from './task.controllers'

const router = Router()

router.post('/add', taskControllers.addTask)

router.get('/', taskControllers.allTasks)

router.get('/:taskId', taskControllers.oneTask)

router.patch('/update/:taskId', taskControllers.updateTask)

router.delete('/delete/:taskId', taskControllers.deleteTask)
