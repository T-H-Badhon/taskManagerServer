import { Router } from 'express'
import { userRoutes } from '../modules/users/users.routes'
import { projectRoutes } from '../modules/project/project.routes'

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
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
