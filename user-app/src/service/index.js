import axios from 'axios'
import { Toast } from 'vant'

export const API_BASE_URL = "http://127.0.0.1:4396/app"
// export const API_BASE_URL = "http://192.168.0.108:4396/app"
// export const API_BASE_URL = "http://115.29.177.15:4396/app"

export const RESOURCES_BASE_URL = 'http://127.0.0.1:4396/static/App'
// export const RESOURCES_BASE_URL = 'http://192.168.0.108:4396/static/App'
// export const RESOURCES_BASE_URL = 'http://115.29.177.15:4396/static/App'

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
      Toast({
        message: response.data.message,
        icon: 'cross'
      })
    }
    return response.data

  }, error => {

    const status = error.response.status

    if (status === 401) {
      Toast({
        message: error.response.data.message,
        icon: 'cross'
      })

      if (localStorage.getItem('token')) {
        localStorage.removeItem('token')
      }
    } else if (status === 500) {
      Toast({
        message: "服务器出错",
        icon: 'cross'
      })
    } else if (status === 400) {
      Toast({
        message: "客户端请求错误",
        icon: 'cross'
      })
    }

  })

  return instance(config)
}