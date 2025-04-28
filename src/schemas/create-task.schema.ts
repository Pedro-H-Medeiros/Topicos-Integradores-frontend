import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .nonempty('Título é obrigatório.')
    .min(3, 'O título deve conter mais de 3 caracteres.'),

  description: z.string().trim().nonempty('Descrição é obrigatório.'),

  status: z.enum(['TODO', 'IN_PROGRESS', 'COMPLETED'], {
    errorMap: () => ({ message: 'Selecione um status válido.' }),
  }),
})

export type CreateTaskSchema = z.infer<typeof createTaskSchema>
