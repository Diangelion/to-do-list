import { del, get, post, put } from '@/api/client'
import {
  createMutationOptions,
  createQueryOptions
} from '@/lib/queryClient.utils'
import type {
  ApiError,
  ApiResponse,
  BackendCustomResponse,
  FetchOptions
} from '@/types/client.types'
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
  type UseQueryResult
} from '@tanstack/react-query'
import { useCallback } from 'react'

// Custom hook for GET requests
export const useFetchQuery = <T>(
  endpoint: string,
  queryKey: unknown[] = [],
  fetchOptions?: FetchOptions,
  queryOptions?: Partial<
    UseQueryOptions<ApiResponse<BackendCustomResponse<T>>, ApiError>
  >
): UseQueryResult<ApiResponse<BackendCustomResponse<T>>, ApiError> => {
  const queryFn = useCallback(
    ({ signal }: { signal: AbortSignal }) =>
      get<T>(endpoint, { signal, ...fetchOptions }),
    [endpoint, fetchOptions]
  )

  return useQuery(
    createQueryOptions([...queryKey, endpoint], queryFn, queryOptions)
  )
}

// Custom hook for POST mutations
export const useFetchMutation = <TData, TVariables>(
  endpoint: string,
  invalidateQueryKey: string | null,
  fetchOptions?: FetchOptions,
  mutationOptions?: UseMutationOptions<
    ApiResponse<BackendCustomResponse<TData>>,
    ApiError,
    TVariables
  >
): UseMutationResult<
  ApiResponse<BackendCustomResponse<TData>>,
  ApiError,
  TVariables
> => {
  const queryClient = useQueryClient()

  const mutationFn = useCallback(
    (variables: TVariables) => post<TData>(endpoint, variables, fetchOptions),
    [endpoint, fetchOptions]
  )

  return useMutation(
    createMutationOptions(mutationFn, {
      onSuccess: () => {
        if (invalidateQueryKey) {
          return queryClient.invalidateQueries({
            queryKey: [invalidateQueryKey]
          })
        }
        return undefined
      },
      ...mutationOptions
    })
  )
}

// Custom hook for PUT mutations
export const useFetchUpdateMutation = <TData, TVariables>(
  endpoint: string,
  invalidateQueryKey: string,
  mutationOptions?: UseMutationOptions<
    ApiResponse<BackendCustomResponse<TData>>,
    ApiError,
    TVariables
  >
): UseMutationResult<
  ApiResponse<BackendCustomResponse<TData>>,
  ApiError,
  TVariables
> => {
  const queryClient = useQueryClient()

  const mutationFn = useCallback(
    (variables: TVariables) => put<TData>(endpoint, variables),
    [endpoint]
  )

  return useMutation(
    createMutationOptions(mutationFn, {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: [invalidateQueryKey] }),
      ...mutationOptions
    })
  )
}

// Custom hook for DELETE mutations
export const useFetchDeleteMutation = <T>(
  endpoint: string,
  invalidateQueryKey: string,
  mutationOptions?: UseMutationOptions<
    ApiResponse<BackendCustomResponse<T>>,
    ApiError
  >
) => {
  const queryClient = useQueryClient()

  const mutationFn = useCallback(() => del<T>(endpoint), [endpoint])

  return useMutation(
    createMutationOptions(mutationFn, {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: [invalidateQueryKey] }),
      ...mutationOptions
    })
  )
}
