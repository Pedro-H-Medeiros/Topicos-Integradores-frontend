'use server'

import { api } from '@/lib/axios'

interface getExternalUserTaskParams {
  accessToken: string
}

export interface getExternalUserTaskResponse {
  tasks: {
    id: string
    title: string
    description: string
    status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED'
    createdAt: Date
    createdBy: string
  }[]
  meta: {
    accessToken: string
  }
}

export async function getExternalUserTask({
  accessToken,
}: getExternalUserTaskParams) {
  const response = await api.get<getExternalUserTaskResponse>(
    `/task/external/${accessToken}`,
  )

  return response.data
}
