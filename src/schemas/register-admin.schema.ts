import { z } from 'zod'

const onlyLettersRegex = /^[A-Za-z\s]+$/

export const registerAdminSchema = z.object({
  name: z
    .string()
    .nonempty('O nome não pode ser vazio.')
    .min(10, 'Deve conter mais de 10 caracteres.')
    .regex(onlyLettersRegex, 'O nome deve conter somente letras.'),

  email: z.string().email().nonempty(),

  password: z.coerce
    .string()
    .min(8, 'A senha deve conter mais de 8 caracteres.')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula.')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula.')
    .regex(
      /[^a-zA-Z0-9]/,
      'A senha deve conter pelo menos um caractere especial.',
    ),
})

export type RegisterAdminSchema = z.infer<typeof registerAdminSchema>
