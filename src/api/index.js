import axios from 'axios'
const request = axios.create({
  baseURL: 'https://f1-management-api-production.up.railway.app/api'
})

export const userApi = {
  list: () => request.get('/user/list'),
  add: (data) => request.post('/user/add', data),
  update: (data) => request.put('/user/update', data),
  delete: (id) => request.delete(`/user/delete/${id}`)
}

export const discussApi = {
  list: () => request.get('/discuss/list'),
  add: (data) => request.post('/discuss/add', data),
  update: (data) => request.put('/discuss/update', data),
  delete: (id) => request.delete(`/discuss/delete/${id}`)
}

export const driverApi = {
  list: () => request.get('/driver/list'),
  add: (data) => request.post('/driver/add', data), 
  update: (data) => request.put('/driver/update', data), 
  delete: (id) => request.delete(`/driver/delete/${id}`),
  detail: (name) => request.get(`/driver/detail?name=${name}`)
}
export const trackApi = {
  list: () => request.get('/track/list'),
  add: (data) => request.post('/track/add', data),
  update: (data) => request.put('/track/update', data),
  delete: (id) => request.delete(`/track/delete/${id}`),
  detail: (name) => request.get(`/track/detail?name=${name}`)
}
export const teamApi = {
  list: () => request.get('/team/list'),
  add: (data) => request.post('/team/add', data),
  update: (data) => request.put('/team/update', data),
  delete: (id) => request.delete(`/team/delete/${id}`),
  detail: (name) => request.get(`/team/detail?name=${name}`)
}