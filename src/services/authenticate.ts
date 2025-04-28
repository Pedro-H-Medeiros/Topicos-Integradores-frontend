import { api } from '@/lib/axios'
import { SignInSchema } from '@/schemas/authenticate.schema'

export async function authenticate({ email, password }: SignInSchema) {
  const response = await api.post(
    '/sign-in',
    { email, password },
    { withCredentials: true },
  )

  return response.data
}
