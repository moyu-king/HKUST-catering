import { axiosInstance } from './index'

export async function getOdersByDateAndPagination(params) {
  return axiosInstance({
    method: 'get',
    url: '/order_search',
    params
  })
}