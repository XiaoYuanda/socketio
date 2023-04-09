
const { Server } = require("socket.io");
// websocket 是基于 http 服务的，这里隐式创建了 http 服务
const io = new Server({
  cors: {
    origin: "*"
  }
});

io.on('connection',async (socket) => {
  const room = socket.handshake.auth.room
  var ids = await io.of("/").in(room).allSockets()
  if(room){
    if(ids.size<2){
      socket.join(room)
      socket.emit('getRoom',room)
    }else {
      console.log('房间人数大于 2, ' + socket.id + ' 无法进入')
      const str =  '房间：'+ room + ' 已满 2 人'
      socket.emit('roomfull', str)
    }
  } else {
    room = Math.random() * 100
    socket.join(room.toSTring())
    socket.emit('getRoom',room)
  }

  ids = await io.of("/").in(room).allSockets();
  
  

  // 1.当没有带着房间号来加入的时候，服务器会生成房间号
  // 2.如果是带着房间号来的，会加入指定的房间
  console.log(ids)

  // 游戏控制消息，负责游戏状态的传输
  socket.on('gameControl', function (msg){
    console.log('gameControl '+socket.id +':', msg)
  })

  // 游戏对象数据的传输
  socket.on('gameData', function (msg){
    socket.to(room).emit('gameData', msg)
  })
  
  // 离开房间触发的函数
  socket.on('disconnect', async () =>{
    console.log('leave')
    const ids = await io.of("/").in(room).allSockets();
    console.log(ids)
  })
})

io.listen(4000); // 监听 4000 端口，这是socket链接的入口