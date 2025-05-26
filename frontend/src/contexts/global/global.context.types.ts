import type { ReactNode } from 'react'

export interface GlobalState {
  env: ImportMetaEnv
  pageLoading: boolean
}

export interface GlobalContextValue {
  globalState: GlobalState
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>
}

export interface GlobalProviderProps {
  children: ReactNode
}
