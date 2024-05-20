import { z } from 'zod'

export const projectValidationSchema = z.object({
  body: z.object({
    projectName: z.string({ required_error: 'project name is required' }),
  }),
})
