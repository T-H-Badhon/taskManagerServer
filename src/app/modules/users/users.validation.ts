import { z } from 'zod'

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    email: z
      .string({ required_error: 'email is required' })
      .email({ message: 'invalid email' }),
    password: z.string({ required_error: 'password is required' }).refine(
      (password) => {
        const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/

        return alphanumericRegex.test(password)
      },
      {
        message: 'password must be alpaneumeric and minimum 6 characters long',
      },
    ),
  }),
})

const loginCredentialValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'emails is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
})

export const userValitdations = {
  userValidationSchema,
  loginCredentialValidationSchema,
}
