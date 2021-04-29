import { axiosInstance } from './index'

export function userRegister(data) {
  return axiosInstance({
    url: "/register",
    method: "post",
    data
  })
}