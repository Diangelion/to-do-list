import type {
  ApiError,
  ApiResponse,
  BackendCustomResponse
} from '@/types/client.types'
import {
  QueryClient,
  type UseMutationOptions,
  type UseQueryOptions
} from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnWindowFocus: false,
      retry: false,
      refetchOnMount: true,
      refetchOnReconnect: true
    },
    mutations: {
      retry: false
    }
  }
})

// Query options factory
export const createQueryOptions = <T>(
  queryKey: unknown[],
  queryFn: ({
    signal
  }: {
    signal: AbortSignal
  }) => Promise<ApiResponse<BackendCustomResponse<T>>>,
  options?: Partial<
    UseQueryOptions<ApiResponse<BackendCustomResponse<T>>, ApiError>
  >
): UseQueryOptions<ApiResponse<BackendCustomResponse<T>>, ApiError> => {
  return {
    queryKey,
    queryFn,
    ...options
  }
}

// Mutation options factory
export const createMutationOptions = <TData, TVariables>(
  mutationFn: (
    variables: TVariables
  ) => Promise<ApiResponse<BackendCustomResponse<TData>>>,
  options?: Partial<
    UseMutationOptions<
      ApiResponse<BackendCustomResponse<TData>>,
      ApiError,
      TVariables
    >
  >
): UseMutationOptions<
  ApiResponse<BackendCustomResponse<TData>>,
  ApiError,
  TVariables
> => {
  return {
    mutationFn,
    ...options
  }
}
