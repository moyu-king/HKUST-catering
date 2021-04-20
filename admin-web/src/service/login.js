import { axiosInstance } from './index'

export async function login(data) {
  return axiosInstance({
    method: 'post',
    url: '/login',
    data
  }, false)
}