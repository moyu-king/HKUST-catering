import { axiosInstance } from './index'

export function getFoods() {
  return axiosInstance({
    url: "/food",
    method: "get",
  })
}