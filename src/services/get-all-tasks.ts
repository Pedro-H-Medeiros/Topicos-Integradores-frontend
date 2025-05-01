'use server'

import { api } from '@/lib/axios'
import { cookies } from 'next/headers'

interface getAllTasksQuery {
  page?: number | null
}

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
  meta: {
    page: number
  }
}

export async function getAllTasks({ page }: getAllTasksQuery) {
  const token = (await cookies()).get('sessionId')?.value

  const response = await api.get<getAllTasksResponse>('/task', {
    params: { page },

    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
