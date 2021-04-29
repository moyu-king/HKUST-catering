import { axiosInstance } from './index'

export function getUserInfo() {
  return axiosInstance({
    url: "/user_info",
    method: "get",
  })
}

export function updateUserInfo(data) {
  return axiosInstance({
    url: '/user_info',
    method: 'put',
    data
  })
}