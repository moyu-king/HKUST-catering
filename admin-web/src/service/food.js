import { axiosInstance } from './index'

export async function addNewFoodToMenu(data) {
  return axiosInstance({
    method: 'post',
    url: '/food',
    data
  })
}

export function getFood() {
  return axiosInstance({
    method: 'get',
    url: '/food'
  })
}

export function updateFoodInfo(data) {
  return axiosInstance({
    method: 'put',
    url: '/food',
    data
  })
}

export function deleteFood(params) {
  return axiosInstance({
    method: 'delete',
    url: '/food',
    params
  })
}