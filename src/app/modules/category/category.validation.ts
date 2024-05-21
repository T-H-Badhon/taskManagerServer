import { z } from 'zod'

export const categoryValidationSchema = z.object({
  body: z.object({
    categoryName: z.string({ required_error: 'category name is required' }),
  }),
})
