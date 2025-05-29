export interface CreateUserRequest {
  token: string
  provider: string
}

export interface CreateUserResponse {
  name: string
  email: string
}
