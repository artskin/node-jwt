const express = require("express");
const app = express()
const bodyParser = require('body-parser')
const router = express.Router();
const server = require('http').Server(app)
const {createToken,verifyToken} = require('./token.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
global.SALT_KEY="amu@521"
const reg = require('./api/reg')
const login = require('./api/login')
const userinfo = require('./api/userinfo')
//const captcha = require('./api/captcha')


app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With")
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
  res.setHeader("X-Powered-By",'3.2.1')
  if(req.method ==='OPTIONS') res.send(200);
  else next();
})

//解析
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

const whiteList = ['/','/api/login','/api/reg','/api/captcha']

app.use((req,res,next)=>{
  console.log(req.url)
  if(req.url.includes('api') && !whiteList.includes(req.url)){
    verifyToken(req.headers.authorization).then(res =>{
      next()
    }).catch(err=>{
      res.json({
        code:401,
        msg:'token无效'
      })
    })
  } else {
    next()
  }
})

app.use(express.static('public'))

app.use('/api', reg)
app.use('/api', login)
app.use('/api', userinfo)
//app.use('/api', captcha)

const io = require('socket.io')(server)

app.get('/ws',(req,res)=>{

})
io.on('connection',(socket)=>{
  socket.on('sendToServer',msg => {
    io.emit('sendToClient',{
      from:'服务器',
      time:new Date().toLocaleString(),
      msg
    });
    //socket.broadcast.emit('clientDown',data); 发给其他用户
  })
  socket.on('disconnect',()=>{
    console.log('连接断开')
  })
  socket.on('reply', () => {
    console.log('重试？')
   });
})


server.listen(4000,()=>{
  console.log('Server started on port http://localhost:4000')
})
// app.listen(4000,()=>{
//   console.log('Server started on port http://localhost:4000')
// })


//const uri = "mongodb://localhost:27017/amudb"
const uri = "mongodb+srv://amu:hiccqiang521@cluster0.n8mbn.mongodb.net/testAm?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology:true } ,(err,client)=>{
  if(err){
    console.log('mongoDB连接失败',err)
  }else{
    console.log('mongoDB连接成功')
  }
});

