
const { Server } = require("socket.io");
// websocket 是基于 http 服务的，这里隐式创建了 http 服务
const io = new Server({
  cors: {
    origin: "*"
  }
});

io.on('connection',(socket) => {
  const room = socket.handshake.auth.room
  socket.join(room)

  // 1.当没有带着房间号来加入的时候，服务器会生成房间号
  // 2.如果是带着房间号来的，会加入指定的房间

  console.log(socket.id +' 加入了房间：'+ room)

  // 游戏控制消息，负责游戏状态的传输
  socket.on('gameControl', function (msg){
    console.log('gameControl '+socket.id +':', msg)
  })

  // 游戏对象数据的传输
  socket.on('gameData', function (msg){
    socket.to(room).emit('gameData', msg)

  })
  
  // 离开房间触发的函数
})

io.listen(4000); // 监听 4000 端口，这是socket链接的入口