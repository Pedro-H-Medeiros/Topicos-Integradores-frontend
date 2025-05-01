'use server'

import { api } from '@/lib/axios'

interface getExternalUserInfoParams {
  accessToken: string
}

export interface getExternalUserInfoResponse {
  user: {
    id: string
    name: string
    email: string
  }
  meta: {
    accessToken: string
  }
}

export async function getExternalUserInfo({
  accessToken,
}: getExternalUserInfoParams) {
  const response = await api.get<getExternalUserInfoResponse>(
    `/person/external-user/${accessToken}`,
  )

  return response.data
}
