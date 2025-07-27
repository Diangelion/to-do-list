export interface CreateDateRequest {
  date: Date
}

export interface ActivityDate {
  id: string
  date: Date
}

export interface CreateActivityRequest {
  date_id: string
  title: string
  description: string
  status: number
}

export interface Activity {
  id: string
  title: string
  description: string
  status: number
}

export interface DeleteTodo {
  id: string
}

// CUD = Create, Update, Delete
export interface CUDResponse {
  message: string
}
