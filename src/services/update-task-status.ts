'use server'

import { api } from '@/lib/axios'
import { UpdateTaskStatusSchema } from '@/schemas/update-task-status.chema'

export interface updateTaskStatusParams {
  taskId: string
}

export interface updateTaskStatusResponse {
  tasks: {
    id: string
    title: string
    status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED'
  }
}

export async function updateTaskStatus({
  taskId,
  status,
}: updateTaskStatusParams & UpdateTaskStatusSchema) {
  const response = await api.put<updateTaskStatusResponse>(
    `/task/${taskId}/update-status`,
    {
      status,
    },
  )

  return response.data
}
