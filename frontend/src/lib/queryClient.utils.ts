import { QueryClient } from '@tanstack/react-query'
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import type { ApiResponse, ApiError } from '@/api/client.types'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
      gcTime: 10 * 60 * 1000, // Cache persists for 10 minutes (formerly cacheTime)
      retry: (failureCount, error: unknown) => {
        const apiError = error as ApiError
        // Skip retries for client errors (4xx)
        if (apiError.status >= 400 && apiError.status < 500) return false
        return failureCount < 3 // Retry max 3 times for other errors
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    },
    mutations: {
      retry: false, // Never retry mutations
    },
  },
})

// Query options factory
export const createQueryOptions = <T>(
  queryKey: unknown[],
  queryFn: () => Promise<ApiResponse<T>>,
  options?: Partial<UseQueryOptions<ApiResponse<T>, ApiError>>
): UseQueryOptions<ApiResponse<T>, ApiError> => ({
  queryKey,
  queryFn,
  ...options,
})

// Mutation options factory
export const createMutationOptions = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>,
  options?: Partial<
    UseMutationOptions<ApiResponse<TData>, ApiError, TVariables>
  >
): UseMutationOptions<ApiResponse<TData>, ApiError, TVariables> => ({
  mutationFn,
  ...options,
})
