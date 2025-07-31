import { useFetchMutation, useFetchQuery } from '@/hooks/useFetchQuery'
import type { LoginRequest, LoginResponse } from '@/types/auth.api.types'
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
    ApiResponse<BackendCustomResponse<LoginResponse>>,
    ApiError,
    LoginRequest
  >
) => {
  return useFetchMutation<LoginResponse, LoginRequest>(
    '/user/login',
    null,
    fetchOptions,
    mutationOptions
  )
}

export const useRefreshUser = (
  fetchOptions?: FetchOptions,
  queryOptions?: Partial<
    UseQueryOptions<ApiResponse<BackendCustomResponse<null>>, ApiError>
  >
) => {
  return useFetchQuery<null>(
    '/user/refresh',
    ['refresh'],
    fetchOptions,
    queryOptions
  )
}

export const useGetUser = (
  fetchOptions?: FetchOptions,
  queryOptions?: Partial<
    UseQueryOptions<ApiResponse<BackendCustomResponse<User>>, ApiError>
  >
) => {
  return useFetchQuery<User>(
    '/user/profile',
    ['user'],
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
    '/user/logout',
    null,
    fetchOptions,
    mutationOptions
  )
}
