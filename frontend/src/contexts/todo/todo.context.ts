import type { TodoContextValue } from '@/types/todo.items.types'
import { createContext } from 'react'

export const initialContextValue: TodoContextValue = {
  todoState: {
    selectedDate: '',
    todoItem: { todo: [], progress: [], done: [] },
    loading: false
  },
  setTodoState: () => {
    throw new Error('setTodoState function must be implemented')
  }
}

export const TodoContext = createContext<TodoContextValue>(initialContextValue)
