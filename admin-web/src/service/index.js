import axios from "axios"
import { Notification } from 'element-ui';
import { baseLoading, baseLoadingClose } from '@/utils/loading'
import router from '../router'

export const API_BASE_URL = "http://127.0.0.1:4396/HKUST"

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
    baseLoadingClose(loading)

    if (error.message = 'Network Error') {
      Notification.error({
        title: '错误',
        message: '网络出现了一些状况，请稍后再试！',
        duration: 2000
      })
    }

    if (error.response.status === 401) {
      Notification.error({
        title: "错误",
        message: error.response.data.message,
        duration: 2000,
      })
      localStorage.removeItem('token')
      router.push('/login')
    }

    return Promise.reject(error)
  })

  return instance(config)
}
