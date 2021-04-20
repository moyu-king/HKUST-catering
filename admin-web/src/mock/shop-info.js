import { mock } from 'mockjs'
import { API_BASE_URL } from '@/service'

mock(API_BASE_URL + '/admin_info', () => ({
  status: 1,
  message: 'ok',
  data: {
    name: "科大餐饮",
    alias: "客服小姐姐",
    phone: "15347789064",
    address: "广西科技大学",
  }
}))