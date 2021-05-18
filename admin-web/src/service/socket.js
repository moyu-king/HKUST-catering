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

  return socket
}