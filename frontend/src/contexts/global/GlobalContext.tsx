import React, { useEffect, useState } from 'react'
import { GlobalContext, initialContextValue } from './global.context'
import getEnv from '@/lib/env.utils'

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [globalState, setGlobalState] = useState(
    initialContextValue.globalState
  )

  useEffect(() => {
    try {
      const env = getEnv()
      setGlobalState(prev => ({ ...prev, env }))
    } catch (error) {
      console.error(`GlobalProvider | ${error}`)
    }
  }, [])

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
