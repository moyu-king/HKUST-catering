import axios from "axios"

export const API_BASE_URL = "http://127.0.0.1:3000"

export function axiosInstance(config) {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000
  })

  instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.authorization = 'Bearer ' + token
    }
    
    return config
  })

  instance.interceptors.response.use(response => {
    if (response.data.status) {
      return response.data.data
    }
  })

  return instance(config)
}
