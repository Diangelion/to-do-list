import { createContext } from 'react'
import type { GlobalContextValue } from './global.context.types'

export const initialContextValue: GlobalContextValue = {
  globalState: {
    env: {
      BASE_URL: '',
      MODE: '',
      DEV: false,
      PROD: false,
      SSR: false,
      VITE_BASE_URL_API: '',
      VITE_GOOGLE_CLIENT_ID: '',
      VITE_GOOGLE_REDIRECT_URI: '',
      VITE_GITHUB_BASE_URL: '',
      VITE_GITHUB_CLIENT_ID: '',
      VITE_GITHUB_CALLBACK_URL: '',
      VITE_FACEBOOK_APP_ID: '',
      VITE_LOCAL_FORAGE_ACCESS_TOKEN_KEY: '',
      VITE_LOCAL_FORAGE_ACCESS_EXPIRATION_TIME_MINUTES: 0,
    },
    pageLoading: false,
  },
  setGlobalState: () => {},
}

export const GlobalContext =
  createContext<GlobalContextValue>(initialContextValue)
