
const { Server } = require("socket.io");
// websocket 是基于 http 服务的，这里隐式创建了 http 服务



const io = new Server({
  cors: {
    origin: "*"
  }
});

io.on('connection',(socket) => {
  const room = socket.handshake.auth.room
  // const offset = socket.handshake.offset
  // console.log('a user connected' + offset);
  socket.join(room)
  console.log(socket.id +' 加入了房间：'+ room)

//   if(offset) {
//     for (const event of await fetchMissedEventFromDatabase(offset)){
//       socket.emit("msg", event)
//     }
//   } else {
//     // this is a first connection
//   }


  socket.on('msg', function (msg){
    console.log('Msg from '+socket.id +':', msg)
  })

  socket.on('roomMsg', function (msg){
    socket.to(room).emit('roomMsg', msg)

  })
// });

// setInterval(async () => {
//   const event = {
//     id: generateUniqueId(),
//     data: new Date().toISOString()
//   }

//   await persistEventToDatabase(event)
//   io.emit('msg', event)
})

io.listen(3000);