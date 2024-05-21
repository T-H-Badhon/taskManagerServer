import { Router } from 'express'
import { userRoutes } from '../modules/users/users.routes'
import { projectRoutes } from '../modules/project/project.routes'
import { taskRoutes } from '../modules/task/task.routes'

const router = Router()

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/project',
    route: projectRoutes,
  },
  {
    path: '/task',
    route: taskRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
