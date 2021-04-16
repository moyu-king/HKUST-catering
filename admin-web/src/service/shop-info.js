import { axiosInstance } from './index'

export async function getShopInfo() {
  return axiosInstance({
    method: 'get',
    url: '/shop_info',
  })
}

export function updateShopInfo(data) {
  return axiosInstance({
    method: 'put',
    url: '/shop_info',
    data
  })
}