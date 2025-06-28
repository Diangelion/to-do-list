import { createContext } from 'react'
import type { GlobalContextValue } from '../../types/global.context.types'

export const initialContextValue: GlobalContextValue = {
  globalState: {
    env: {},
    isLoading: false
  },
  setGlobalState: () => {
    throw new Error('setGlobalState function must be implemented')
  }
}

export const GlobalContext =
  createContext<GlobalContextValue>(initialContextValue)
