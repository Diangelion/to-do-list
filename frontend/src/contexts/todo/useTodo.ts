import type { TodoContextValue } from '@/types/todo.items.types'
import { useContext } from 'react'
import { TodoContext } from './todo.context'

const useTodo = (): TodoContextValue => {
  const context = useContext(TodoContext)
  return context
}

export default useTodo
