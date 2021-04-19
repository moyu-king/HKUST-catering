import axios from "axios"
import { Notification } from 'element-ui';

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
    if (!response.data.status) {
      Notification.error({
        title: '错误',
        message: response.data.message
      });
    }
    return response.data
  }, error => {
    if (error.response.status === 401) {
      Notification.error({
        title: "错误",
        message: error.response.data.message,
        duration: 2000,
      })
      localStorage.removeItem('token')
    }
    return Promise.reject(error)
  })

  return instance(config)
}
