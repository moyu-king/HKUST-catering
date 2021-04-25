import { axiosInstance } from './index'

export function getFoodMenu(params) {
  return axiosInstance({
    method: 'get',
    url: '/food_menu',
    params
  })
}

export function addFoodMenu(data) {
  return axiosInstance({
    method: 'post',
    url: '/food_menu',
    data
  })
}

export function addDuplicateFoodMenu(data) {
  return axiosInstance({
    method: 'post',
    url: '/food_menu/duplicate',
    data
  })
}

export function updateFoodMenuNum(data) {
  return axiosInstance({
    method: 'put',
    url: '/food_menu',
    data
  })
}

export function deleteFoodMenu(params) {
  return axiosInstance({
    method: 'delete',
    url: '/food_menu',
    params
  })
}