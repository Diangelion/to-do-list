import { useFetchMutation } from '@/hooks/useFetchQuery'
import type {
  CreateUserRequest,
  CreateUserResponse,
} from '@/api/auth/auth.api.types'

export const useCreateUser = () => {
  return useFetchMutation<CreateUserResponse, CreateUserRequest>(
    '/login',
    'users'
  )
}
