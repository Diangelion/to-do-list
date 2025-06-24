import type { TodoItem, TodoState } from '@/types/todo.items.types'
import React, { useEffect, useState } from 'react'
import { TodoContext, initialContextValue } from './todo.context'

const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [todoState, setTodoState] = useState<TodoState>(
    initialContextValue.todoState
  )

  useEffect(() => {
    const fetchUsers = () => {
      setTodoState(prev => ({ ...prev, loading: true }))
      setTimeout(() => {
        try {
          const fakeData: TodoItem[] = [
            {
              status: 0,
              title: 'Belajar React',
              description: 'Mempelajari hooks dan komponen dasar'
            },
            {
              status: 2,
              title: 'Membaca dokumentasi Tanstack Query',
              description: 'Sudah dipahami tentang useQuery dan useMutation'
            },
            {
              status: 1,
              title: 'Implementasi OAuth GitHub',
              description: 'Login dengan OAuth dan token exchange'
            },
            {
              status: 0,
              title: 'Buat komponen reusable',
              description: 'Pisahkan logic ke dalam komponen dan hooks'
            },
            {
              status: 1,
              title: 'Testing komponen form',
              description: 'Gunakan React Testing Library untuk validasi form'
            },
            {
              status: 2,
              title: 'Deploy aplikasi ke Vercel',
              description: 'Pastikan environment variable sudah dikonfigurasi'
            },
            {
              status: 0,
              title: 'Kustomisasi UI dengan Tailwind',
              description: 'Ubah tema warna dan spacing sesuai brand'
            },
            {
              status: 1,
              title: 'Buat dokumentasi API',
              description: 'Deskripsikan setiap endpoint dan respons-nya'
            },
            {
              status: 2,
              title: 'Fix bug validasi email',
              description: 'Perbaiki regex dan error message'
            },
            {
              status: 0,
              title: 'Pelajari Zustand',
              description: 'Coba implementasi state global tanpa Redux'
            },
            {
              status: 1,
              title: 'Integrasi Firebase Auth',
              description: 'Setup login dan verifikasi email'
            },
            {
              status: 2,
              title: 'Gunakan react-query-devtools',
              description: 'Aktifkan devtools untuk debugging query'
            },
            {
              status: 0,
              title: 'Refactor struktur folder',
              description: 'Pisahkan domain, shared, dan features'
            },
            {
              status: 1,
              title: 'Optimasi gambar',
              description: 'Gunakan next/image untuk lazy loading dan compress'
            },
            {
              status: 2,
              title: 'Buat loading skeleton',
              description: 'Tampilkan efek loading sebelum data muncul'
            }
          ]

          const todoItem = {
            todo: fakeData.filter(todo => todo.status === 0),
            progress: fakeData.filter(todo => todo.status === 1),
            done: fakeData.filter(todo => todo.status === 2)
          }
          setTodoState(prev => ({
            ...prev,
            selectedDate: '24-06-2025',
            todoItem,
            loading: false
          }))
        } catch (err) {
          console.log(err)
          setTodoState(prev => ({ ...prev, loading: false }))
        }
      }, 2000)
    }
    fetchUsers()
  }, [])

  const contextValue = React.useMemo(
    () => ({ todoState, setTodoState }),
    [todoState, setTodoState]
  )

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  )
}

export default TodoProvider
