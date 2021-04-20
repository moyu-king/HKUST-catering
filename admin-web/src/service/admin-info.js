import { axiosInstance } from './index'

export async function getShopInfo() {
  return axiosInstance({
    method: 'get',
    url: '/admin_info',
  })
}

export function updateShopInfo(data) {
  return axiosInstance({
    method: 'put',
    url: '/admin_info',
    data
  })
}

export function validatePass(data) {
  return axiosInstance({
    method: 'post',
    url: '/pass_validate',
    data
  })
}

export function updatePass(data) {
  return axiosInstance({
    method: 'put',
    url: '/pass_update',
    data
  })
}