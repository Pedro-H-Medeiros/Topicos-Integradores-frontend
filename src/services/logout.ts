'use client'

import { api } from '@/lib/axios'

export async function logout() {
  return await api.post('/logout', {}, { withCredentials: true })
}
