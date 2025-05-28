import { z } from 'zod'

export const updateTaskStatusSchema = z.object({
  status: z.enum(['TODO', 'IN_PROGRESS', 'COMPLETED'], {
    errorMap: () => ({ message: 'Selecione um status válido.' }),
  }),
})

export type UpdateTaskStatusSchema = z.infer<typeof updateTaskStatusSchema>
