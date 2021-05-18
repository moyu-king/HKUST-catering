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

export function isPaymentPassExist() {
  return axiosInstance({
    url: "/student-payment-pass/exist",
    method: 'get'
  })
}

export function validatePaymentPass(data) {
  return axiosInstance({
    url: "/student-payment-pass/validate",
    method: 'post',
    data
  })
}

export function updatePaymentPass(data) {
  return axiosInstance({
    url: "/student-payment-pass/update",
    method: 'put',
    data
  })
}

export function updateWallet(data) {
  return axiosInstance({
    url: "/student-wallet",
    method: 'put',
    data
  })
}
