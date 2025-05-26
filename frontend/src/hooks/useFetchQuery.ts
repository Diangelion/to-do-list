import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  UseQueryResult,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'
import type { ApiResponse, ApiError, FetchOptions } from '@/api/client.types'
import { get, post, put, del } from '@/api/client'
import {
  createQueryOptions,
  createMutationOptions,
} from '@/lib/queryClient.utils'
import { useCallback, useRef, useEffect } from 'react'

// Custom hook for GET requests
export const useFetchQuery = <T>(
  endpoint: string,
  queryKey: unknown[] = [],
  options?: Partial<UseQueryOptions<ApiResponse<T>, ApiError>>
): UseQueryResult<ApiResponse<T>, ApiError> => {
  const abortControllerRef = useRef<AbortController>(null)

  const queryFn = useCallback(async () => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController()

    return get<T>(endpoint, { signal: abortControllerRef.current.signal })
  }, [endpoint])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return useQuery(createQueryOptions([...queryKey, endpoint], queryFn, options))
}

// Custom hook for POST mutations
export const useFetchMutation = <TData, TVariables>(
  endpoint: string,
  invalidateQueryKey: string,
  fetchOptions?: FetchOptions,
  mutationOptions?: UseMutationOptions<ApiResponse<TData>, ApiError, TVariables>
): UseMutationResult<ApiResponse<TData>, ApiError, TVariables> => {
  const queryClient = useQueryClient()

  const mutationFn = useCallback(
    (variables: TVariables) => post<TData>(endpoint, variables, fetchOptions),
    [endpoint]
  )

  return useMutation(
    createMutationOptions(mutationFn, {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: [invalidateQueryKey] }),
      ...mutationOptions,
    })
  )
}

// Custom hook for PUT mutations
export const useFetchUpdateMutation = <TData, TVariables>(
  endpoint: string,
  invalidateQueryKey: string,
  mutationOptions?: UseMutationOptions<ApiResponse<TData>, ApiError, TVariables>
): UseMutationResult<ApiResponse<TData>, ApiError, TVariables> => {
  const queryClient = useQueryClient()

  const mutationFn = useCallback(
    (variables: TVariables) => put<TData>(endpoint, variables),
    [endpoint]
  )

  return useMutation(
    createMutationOptions(mutationFn, {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: [invalidateQueryKey] }),
      ...mutationOptions,
    })
  )
}

// Custom hook for DELETE mutations
export const useFetchDeleteMutation = <T>(
  endpoint: string,
  invalidateQueryKey: string,
  mutationOptions?: UseMutationOptions<ApiResponse<T>, ApiError>
) => {
  const queryClient = useQueryClient()

  const mutationFn = useCallback(() => del<T>(endpoint), [endpoint])

  return useMutation(
    createMutationOptions(mutationFn, {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: [invalidateQueryKey] }),
      ...mutationOptions,
    })
  )
}
