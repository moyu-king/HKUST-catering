import { axiosInstance } from './index';

export function login(data) {
  return axiosInstance({
    url: "/login",
    method: "POST",
    data
  })
}

export function validatePass(data) {
  return axiosInstance({
    url: "/pass/validate",
    method: "POST",
    data
  })
}

export function updatePass(data) {
  return axiosInstance({
    url: "/pass/update",
    method: "POST",
    data
  })
}