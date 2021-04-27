import { axiosInstance } from './index'

export async function addCoupon(data) {
  return axiosInstance({
    method: 'post',
    url: '/coupon',
    data
  })
}