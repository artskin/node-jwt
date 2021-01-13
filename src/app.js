const express = require("express");
const bodyParser = require('body-parser')
const router = express.Router();
const {createToken,verifyToken} = require('./token.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
global.SALT_KEY="amu@521"
const reg = require('./api/reg')
const login = require('./api/login')
const userinfo = require('./api/userinfo')

const app = express()
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
app.use(bodyParser.urlencoded());

// const responseData ={};
// router.use((req,res,next)=>{
//   responseData = {
//     code:0,
//     msg:'未定义'
//   }
//   next()
// })

const whiteList = ['/','/api/login','/api/reg']

app.use((req,res,next)=>{
  console.log(req.url)
  if(req.url.includes('api') && !whiteList.includes(req.url)){
    //console.log(req.headers.authorization)
    verifyToken(req.headers.authorization).then(res =>{
      next()
    }).catch(err=>{
      res.status(401).send('token 无效')
    })
  } else {
    next()
  }
})

// app.post('/api/login',(req,res)=>{
//   // userLists.find((item,index)=>{
//   //   console.log(index,item.name , loginInfo.name,item.name === loginInfo.name)
//   //   if(item.name === loginInfo.name){
//   //     currentIndex = index
//   //     currentUser =  item
//   //     console.log('数据库',currentUser)
//   //     // if(loginInfo.pwd !== currentUser.pwd){
//   //     //   res.send({
//   //     //     code:300,
//   //     //     msg:'密码不正确'
//   //     //   })
//   //     //   return
//   //     // }
//   //     // let token = createToken(currentUser)
//   //     // res.json({token})
//   //   }else{
//   //     res.send({
//   //       code:300,
//   //       msg:'用户不存在'
//   //     })
//   //     return
//   //   }
//   // })
  
// })

app.use(express.static('public'))

app.use('/api', reg)
app.use('/api', login)
app.use('/api', userinfo)

mongoose.connect('mongodb://localhost:27017/amudb',(err)=>{
  if(err){
    console.log('连接失败')
  }else{
    console.log('连接成功')
    
  }
})
app.listen(4000,()=>{
  console.log('Server started on port 4000 http://localhost:4000')
})