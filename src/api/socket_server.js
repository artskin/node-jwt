
module.exports = (server) => {
  const io = require('socket.io')(server)
  const Message = require('../models/Message');

  io.on('connection',(socket)=>{
    console.log('rooms',socket.rooms)
    Message.find({},null,{sort:{'time': -1},limit: 5},(err,data)=>{
      io.emit('sendToClientHistory',data.reverse())
    })
    
    socket.on('sendToServer',info => {
      console.log(info)
      let userMsg = {
        ...info,
        ua:socket.handshake.headers['user-agent'],
        _id:socket.client.id+ +new Date()
      }

      let message = new Message(userMsg)
      message.save()
      
      io.emit('sendToClient',userMsg);
      //socket.broadcast.emit('clientDown',data); 发给其他用户
    })
    socket.on('disconnect',(err)=>{
      console.log('连接断开',err)
    })
    socket.on('reply', () => {
      console.log('重试？')
    });
  })
}
