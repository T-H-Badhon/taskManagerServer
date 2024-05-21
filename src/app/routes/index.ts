import { Router } from 'express'
import { userRoutes } from '../modules/users/users.routes'
import { projectRoutes } from '../modules/project/project.routes'
import { taskRoutes } from '../modules/task/task.routes'
import { categoryRoutes } from '../modules/category/category.routes'

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
    path: '/category',
    route: categoryRoutes,
  },
  {
    path: '/task',
    route: taskRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
