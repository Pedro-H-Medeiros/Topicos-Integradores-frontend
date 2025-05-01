'use server'

import { api } from '@/lib/axios'
import { cookies } from 'next/headers'

interface assignTaskQuery {
  taskId: string
  name?: string | null
  email?: string | null
}

export async function assignTask({ taskId, name, email }: assignTaskQuery) {
  const token = (await cookies()).get('sessionId')?.value

  const response = await api.put(
    `/task/${taskId}/assign`,
    {},
    {
      params: { name, email },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}
