'use server'

import { api } from '@/lib/axios'
import { cookies } from 'next/headers'

export interface getAllTasksResponse {
  tasks: {
    id: string
    title: string
    description: string
    status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED'
    createdAt: Date
    createdBy: {
      name: string
    }
  }[]
}

export async function getAllTasks() {
  const token = (await cookies()).get('sessionId')?.value

  const response = await api.get<getAllTasksResponse>('/task', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
