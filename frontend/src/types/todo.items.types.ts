import type React from 'react'

export interface TodoState {
  selectedDate: string
  todoItem: TodoList
  loading: boolean
}

export interface TodoContextValue {
  todoState: TodoState
  setTodoState: React.Dispatch<React.SetStateAction<TodoState>>
}

type TodoStatus = 0 | 1 | 2
export interface TodoItem {
  status: TodoStatus
  title: string
  description: string
}

export interface TodoList {
  [key: string]: TodoItem[]
}
