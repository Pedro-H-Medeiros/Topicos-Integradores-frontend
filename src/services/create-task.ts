'use server'

import { api } from '@/lib/axios'
import { CreateTaskSchema } from '@/schemas/create-task.schema'
import { cookies } from 'next/headers'

export async function createTask({
  title,
  description,
  status,
}: CreateTaskSchema) {
  const token = (await cookies()).get('sessionId')?.value

  const response = await api.post(
    '/task/create',
    { title, description, status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}
