import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import type { User } from '@/contexts/auth/auth.context.types'
import { useFetchQuery, useFetchMutation } from '@/hooks/useFetchQuery'
import type {
  CreateUserRequest,
  CreateUserResponse,
} from '@/api/auth/auth.api.types'
import type {
  ApiError,
  BackendCustomResponse,
  ApiResponse,
  FetchOptions,
} from '@/api/client.types'

export const useVerifyUser = (
  fetchOptions?: FetchOptions,
  queryOptions?: Partial<
    UseQueryOptions<ApiResponse<BackendCustomResponse<User>>, ApiError>
  >
) => {
  return useFetchQuery<User>(
    '/users/verify',
    ['users'],
    fetchOptions,
    queryOptions
  )
}

export const useCreateUser = (
  fetchOptions?: FetchOptions,
  mutationOptions?: UseMutationOptions<
    ApiResponse<BackendCustomResponse<CreateUserResponse>>,
    ApiError,
    CreateUserRequest
  >
) => {
  return useFetchMutation<CreateUserResponse, CreateUserRequest>(
    `/users/login`,
    'users',
    fetchOptions,
    mutationOptions
  )
}
