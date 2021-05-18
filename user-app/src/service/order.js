import { axiosInstance } from './index'

export function getOrderTypes() {
  return axiosInstance({
    url: "/order/type",
    method: 'get',
  })
}

export function getOrder() {
  return axiosInstance({
    url: '/order',
    method: 'get'
  })
}
