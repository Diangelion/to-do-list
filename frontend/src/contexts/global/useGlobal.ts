import { useContext } from 'react'
import { GlobalContext } from './global.context'
import type { GlobalContextValue } from './global.context.types'

const useGlobal = (): GlobalContextValue => {
  const context = useContext(GlobalContext)

  if (context === undefined) {
    throw new Error('useGlobal context is undefined')
  }

  return context
}

export default useGlobal
