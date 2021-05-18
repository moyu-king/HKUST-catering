import { axiosInstance } from './index'

export function getIssueCoupons() {
  return axiosInstance({
    url: "/issue-coupons",
    method: "get",
  })
}

export function getStudentCoupons() {
  return axiosInstance({
    url: "/student-coupons",
    method: "get"
  })
}

export function addStudentCoupon(data) {
  return axiosInstance({
    url: "/student_coupons",
    method: 'post',
    data
  })
}