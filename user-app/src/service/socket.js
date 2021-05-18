import router from '../router'
import { Toast } from 'vant'
// const URL = 'ws://127.0.0.1:9527'
const URL = 'ws://192.168.201.2:9527'

export function orderSocket(data) {
  const socket = new WebSocket(URL)

  socket.addEventListener('open', () => {
    console.log("ws连接成功");
    socket.send(
      JSON.stringify(data)
    );
  })

  socket.addEventListener('message', e => {
    console.log(e)
    socket.close()
    //订单成功处理
    router.push('/order')
    Toast.success('预订成功！')
  })
}