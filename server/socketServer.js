
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
  console.log(socket.rooms)

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
    
    console.log(msg.data)

  })
  var timer = null
  socket.on('textData', function (msg){
    var obj = {'msg': msg}
    console.log(obj)
    socket.to(room).emit('gettextData', msg)
  })
  socket.on("disconnecting", () => {
    console.log(socket.rooms)
  });
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
console.log('server on 3000')