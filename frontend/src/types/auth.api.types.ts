export interface CreateUserRequest {
  token: string
  provider: string
}

export interface CreateUserResponse {
  access_token: string
}
