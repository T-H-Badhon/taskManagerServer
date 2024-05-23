import { z } from 'zod'

const taskValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required' }),
    description: z.string({ required_error: 'description is required' }),
    dueDate: z.string({ required_error: 'dueDate is required' }),
    priority: z.enum(['HIGH', 'MEDIUM', 'LOW']),
    status: z.enum(['TO-DO', 'IN-PROGRESS', 'COMPLETED']),
    projectId: z.string().optional(),
    categoryId: z.string().optional(),
    assignedUserId: z.string().optional(),
  }),
})

const updateTaskValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required' }).optional(),
    description: z
      .string({ required_error: 'description is required' })
      .optional(),
    dueDate: z.string({ required_error: 'dueDate is required' }).optional(),
    priority: z.enum(['HIGH', 'MEDIUM', 'LOW']).optional(),
    status: z.enum(['TO-DO', 'IN-PROGRESS', 'COMPLETED']).optional(),
    projectId: z.string().optional(),
    categoryId: z.string().optional(),
    assignedUserId: z.string().optional(),
  }),
})

export const taskValitdations = {
  taskValidationSchema,
  updateTaskValidationSchema,
}
