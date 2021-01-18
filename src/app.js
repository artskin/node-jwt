const express = require("express");
const app = express()
const bodyParser = require('body-parser')

const server = require('http').Server(app)
const {createToken,verifyToken} = require('./token.js');
global.SALT_KEY="amu@521"

//json解析
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

//base-setting
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With")
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
  res.setHeader("X-Powered-By",'3.2.1')
  if(req.method ==='OPTIONS') res.send(200);
  else next();
})

//api校验
const whiteList = ['/','/api/login','/api/reg','/api/captcha']
app.use((req,res,next)=>{
  console.log(req.url,!whiteList.includes(req.url))
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

//api-router
const reg = require('./api/reg')
const login = require('./api/login')
const userinfo = require('./api/userinfo')
//const captcha = require('./api/captcha')
app.use('/api', reg)
app.use('/api', login)
app.use('/api', userinfo)
//app.use('/api', captcha)

require('./api/socket_server')(server);

server.listen(3000,()=>{
  console.log('Server started on port http://localhost:3000')
})

require('./db/index')(app);