'use server'

import { api } from '@/lib/axios'
import { cookies } from 'next/headers'

export interface profileResponse {
  userProfile: {
    name: string
  }
}

export async function profile() {
  const token = (await cookies()).get('sessionId')?.value

  const response = await api.get<profileResponse>('/person/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
