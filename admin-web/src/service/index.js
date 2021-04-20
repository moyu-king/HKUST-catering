import axios from "axios"
import { Notification } from 'element-ui';
import { baseLoading, baseLoadingClose } from '@/utils/loading'

export const API_BASE_URL = "http://127.0.0.1:3000/HKUST"

export function axiosInstance(config, isLoading = true) {
  let loading = null
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000
  })

  instance.interceptors.request.use(config => {
    if (isLoading) {
      const target = document.getElementsByClassName('main')[0]
      loading = baseLoading(target)
    }

    const token = localStorage.getItem('token')
    if (token) {
      config.headers.authorization = 'Bearer ' + token
    }

    return config
  })

  instance.interceptors.response.use(response => {
    baseLoadingClose(loading)

    if (!response.data.status) {
      Notification.error({
        title: '错误',
        message: response.data.message
      });
    }

    return response.data
  }, error => {
    if (error.response.status === 401) {
      baseLoadingClose(loading)

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
