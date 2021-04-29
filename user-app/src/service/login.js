import { axiosInstance } from './index'

export function userLogin(data) {
  return axiosInstance({
    url: "/login",
    method: "post",
    data
  })
}