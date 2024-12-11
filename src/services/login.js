import http from '../request/http'

export const loginApi = (data) => {
  return http.post('/auth/login', data)
}
export const registerApi = (data) => {
  return http.post('/auth/register', data)
}

export const logoutApi = (data) => {
  // return http.post('/auth/logout', data)
  localStorage.clear()
}
