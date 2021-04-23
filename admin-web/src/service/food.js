import { axiosInstance } from './index'

export async function addNewFoodToMenu(data) {
  return axiosInstance({
    method: 'post',
    url: '/food_add',
    data
  })
}