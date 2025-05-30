import { useFetchMutation } from '@/hooks/useFetchQuery'
import type {
  CreateUserRequest,
  CreateUserResponse,
} from '@/api/auth/auth.api.types'
import type { ApiResponse } from '@/api/client.types'

export const useCreateUser = () => {
  return useFetchMutation<ApiResponse<CreateUserResponse>, CreateUserRequest>(
    `/users/login`,
    'users'
  )
}
