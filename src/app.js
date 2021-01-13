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
app.use(bodyParser.urlencoded({ extended: true }));

const whiteList = ['/','/api/login','/api/reg']

app.use((req,res,next)=>{
  console.log(req.url)
  if(req.url.includes('api') && !whiteList.includes(req.url)){
    //console.log(req.headers.authorization)
    verifyToken(req.headers.authorization).then(res =>{
      next()
    }).catch(err=>{
      res.status(401);//.send('token 无效')
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
app.listen(4000,()=>{
  console.log('Server started on port http://localhost:4000')
})
//const uri = "mongodb://localhost:27017/amudb"
const uri = "mongodb+srv://amu:hiccqiang521@cluster0.n8mbn.mongodb.net/testAm?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology:true } ,(err,client)=>{
  if(err){
    console.log('mongoDB连接失败',err)
  }else{
    console.log('mongoDB连接成功')
  }
});

