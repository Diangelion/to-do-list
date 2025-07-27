import {
  useFetchDeleteMutation,
  useFetchMutation,
  useFetchQuery,
  useFetchUpdateMutation
} from '@/hooks/useFetchQuery'
import type {
  ApiError,
  ApiResponse,
  BackendCustomResponse,
  FetchOptions
} from '@/types/client.types'
import type {
  Activity,
  ActivityDate,
  CreateActivityRequest,
  CreateDateRequest,
  CUDResponse,
  DeleteTodo
} from '@/types/todo.api.types'
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'

// Date
export const useCreateDate = (
  fetchOptions?: FetchOptions,
  mutationOptions?: UseMutationOptions<
    ApiResponse<BackendCustomResponse<CUDResponse>>,
    ApiError,
    CreateDateRequest
  >
) => {
  return useFetchMutation<CUDResponse, CreateDateRequest>(
    '/todo/create-date',
    null,
    fetchOptions,
    mutationOptions
  )
}

export const useGetAllDates = (
  fetchOptions?: FetchOptions,
  queryOptions?: Partial<
    UseQueryOptions<
      ApiResponse<BackendCustomResponse<ActivityDate[]>>,
      ApiError
    >
  >
) => {
  return useFetchQuery<ActivityDate[]>(
    '/todos/get-all-dates',
    ['all-dates'],
    fetchOptions,
    queryOptions
  )
}

export const useUpdateDate = (
  mutationOptions?: UseMutationOptions<
    ApiResponse<BackendCustomResponse<CUDResponse>>,
    ApiError,
    ActivityDate
  >
) => {
  return useFetchUpdateMutation<CUDResponse, ActivityDate>(
    '/todos/update-date',
    null,
    mutationOptions
  )
}

export const useDeleteDate = (
  mutationOptions?: UseMutationOptions<
    ApiResponse<BackendCustomResponse<CUDResponse>>,
    ApiError,
    DeleteTodo
  >
) => {
  return useFetchDeleteMutation<CUDResponse, DeleteTodo>(
    '/todos/delete-date',
    null,
    mutationOptions
  )
}

// Activity
export const useCreateActivity = (
  fetchOptions?: FetchOptions,
  mutationOptions?: UseMutationOptions<
    ApiResponse<BackendCustomResponse<CUDResponse>>,
    ApiError,
    CreateActivityRequest
  >
) => {
  return useFetchMutation<CUDResponse, CreateActivityRequest>(
    '/todo/create-activity',
    null,
    fetchOptions,
    mutationOptions
  )
}

export const useGetAllActivities = (
  fetchOptions?: FetchOptions,
  queryOptions?: Partial<
    UseQueryOptions<ApiResponse<BackendCustomResponse<Activity[]>>, ApiError>
  >
) => {
  return useFetchQuery<Activity[]>(
    '/todos/get-all-activities',
    ['all-activities'],
    fetchOptions,
    queryOptions
  )
}

export const useUpdateActivity = (
  mutationOptions?: UseMutationOptions<
    ApiResponse<BackendCustomResponse<CUDResponse>>,
    ApiError,
    Activity
  >
) => {
  return useFetchUpdateMutation<CUDResponse, Activity>(
    '/todos/update-activity',
    null,
    mutationOptions
  )
}

export const useDeleteActivity = (
  mutationOptions?: UseMutationOptions<
    ApiResponse<BackendCustomResponse<CUDResponse>>,
    ApiError,
    DeleteTodo
  >
) => {
  return useFetchDeleteMutation<CUDResponse, DeleteTodo>(
    '/todos/delete-activity',
    null,
    mutationOptions
  )
}
