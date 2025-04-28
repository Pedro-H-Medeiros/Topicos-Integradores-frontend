import z from 'zod'

export const signInSchema = z.object({
  email: z.string().email('O campo email não deve ser vazio.'),
  password: z.string().min(8, 'A senha deve conter mais de 8 caracteres.'),
})

export type SignInSchema = z.infer<typeof signInSchema>
