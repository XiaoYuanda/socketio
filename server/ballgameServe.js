const { Server } = require("socket.io");
// websocket 是基于 http 服务的，这里隐式创建了 http 服务
const io = new Server({
  cors: {
    origin: "*"
  }
});

io.on('connection',(socket) => {
  // 这里写 socketio 自定义事件
})

// 存储小球的位置和速度
var ball = {}
// 初始化小球的位置和速度
function initBall(){

}
// 更新小球的位置
function calcBallPosition(){

}
// 推送小球的位置
function sendballPosition(){

}
io.listen(3000)