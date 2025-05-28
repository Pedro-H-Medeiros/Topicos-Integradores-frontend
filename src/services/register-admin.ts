'use client'

import { api } from '@/lib/axios'
import { RegisterAdminSchema } from '@/schemas/register-admin.schema'
// import { cookies } from 'next/headers'

export async function registerAdmin({
  name,
  email,
  password,
}: RegisterAdminSchema) {
  // const token = (await cookies()).get('sessionId')?.value
  const token = localStorage.getItem('sessionId')

  const response = await api.post(
    '/person/create',
    { name, email, password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}
