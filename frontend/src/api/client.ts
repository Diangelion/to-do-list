import {
  combineSignals,
  createTimeoutSignal,
  handleFetchError
} from '@/lib/client.utils'

import { tokenService } from '@/services/token.service'
import type {
  ApiResponse,
  BackendCustomResponse,
  FetchOptions
} from '@/types/client.types'

const baseURL = import.meta.env.VITE_BASE_URL_API

const apiRequest = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<BackendCustomResponse<T>>> => {
  const { timeout = 10000, headers = {}, signal, ...fetchOptions } = options

  const url = `${baseURL}${endpoint}`
  const timeoutSignal = createTimeoutSignal(timeout)
  const combinedSignal = combineSignals(signal, timeoutSignal)
  const accessToken = await tokenService.ensureFreshToken()

  const requestOptions: RequestInit = {
    ...fetchOptions,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers
    },
    signal: combinedSignal
  }

  try {
    const response = await fetch(url, requestOptions)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    return {
      data,
      status: response.status,
      message: response.statusText
    }
  } catch (error) {
    throw handleFetchError(error)
  }
}

export const get = <T>(
  endpoint: string,
  options?: FetchOptions
): Promise<ApiResponse<BackendCustomResponse<T>>> =>
  apiRequest<T>(endpoint, { ...options, method: 'GET' })

export const post = <T>(
  endpoint: string,
  data?: unknown,
  options?: FetchOptions
): Promise<ApiResponse<BackendCustomResponse<T>>> =>
  apiRequest<T>(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data)
  })

export const put = <T>(
  endpoint: string,
  data?: unknown,
  options?: FetchOptions
): Promise<ApiResponse<BackendCustomResponse<T>>> =>
  apiRequest<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data)
  })

export const del = <T>(
  endpoint: string,
  options?: FetchOptions
): Promise<ApiResponse<BackendCustomResponse<T>>> =>
  apiRequest<T>(endpoint, { ...options, method: 'DELETE' })

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL_API}/auth/refresh`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    if (!response.ok) throw new Error('Refresh access token failed')
    const json = await response.json()
    console.log(json)
    const newToken = json.access_token
    if (newToken) return newToken
    return null
  } catch {
    return null
  }
}
