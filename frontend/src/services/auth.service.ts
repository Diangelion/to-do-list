import { useFetchMutation, useFetchQuery } from '@/hooks/useFetchQuery'
import type {
  CreateUserRequest,
  CreateUserResponse
} from '@/types/auth.api.types'
import type { User } from '@/types/auth.context.types'
import type {
  ApiError,
  ApiResponse,
  BackendCustomResponse,
  FetchOptions
} from '@/types/client.types'
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'

export const useCreateUser = (
  fetchOptions?: FetchOptions,
  mutationOptions?: UseMutationOptions<
    ApiResponse<BackendCustomResponse<CreateUserResponse>>,
    ApiError,
    CreateUserRequest
  >
) => {
  return useFetchMutation<CreateUserResponse, CreateUserRequest>(
    '/users/login',
    null,
    fetchOptions,
    mutationOptions
  )
}

export const useVerifyUser = (
  fetchOptions?: FetchOptions,
  queryOptions?: Partial<
    UseQueryOptions<ApiResponse<BackendCustomResponse<User>>, ApiError>
  >
) => {
  return useFetchQuery<User>(
    '/users/profile',
    ['users'],
    fetchOptions,
    queryOptions
  )
}

export const useLogoutUser = (
  fetchOptions?: FetchOptions,
  mutationOptions?: UseMutationOptions<
    ApiResponse<BackendCustomResponse<null>>,
    ApiError,
    null
  >
) => {
  return useFetchMutation<null, null>(
    '/users/logout',
    null,
    fetchOptions,
    mutationOptions
  )
}
