import { useFetchMutation } from '@/hooks/useFetchQuery'
import type {
  CreateUserRequest,
  CreateUserResponse,
} from '@/api/auth/auth.api.types'

export const useCreateUser = (provider: string) => {
  return useFetchMutation<CreateUserResponse, CreateUserRequest>(
    `/oauth/${provider}`,
    'users'
  )
}
