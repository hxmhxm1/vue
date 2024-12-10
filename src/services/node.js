import http from '../request/http'

export const getListApi = () => {
  return http.get('/')
}

export const addListApi = (data) => {
  return http.post('/account', data)
}

export const deleteListItemApi = (id) => {
  return http.get(`/delete/${id}`)
}
