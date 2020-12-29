const express = require("express");
const {createToken,verifyToken} = require('./token.js')
const app = express()

const secret = 'dsdsd123sdqd34'

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With")
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
  res.setHeader("X-Powered-By",' 3.2.1')

  if(req.method ==='OPTIONS') res.send(200);
  else next();
})

const whiteList = ['/login','/','user.html']

app.use((req,res,next)=>{
  console.log(req.headers.authorization)
  if(!whiteList.includes(req.url)){
    verifyToken(req.headers.authorization).then(res =>{
      console.log(res)
      next()
    }).catch(err=>{
      console.log(err)
      res.status(401).send('token 无效')
    })
  } else {
    next()
  }
})

app.post('/login',(req,res)=>{
  const user = {
    id:10,
    name:"amu",
    age:16
  }
  let token = createToken(user)
  res.json({token})
})

app.get('/userInfo',(req,res)=>{
  res.send({
    result:1,
    data:{
      'name':'amu',
      'id':1
    }
  })
})

app.listen(4000,()=>{
  console.log('Server started on port 4000')
})
app.use(express.static('public'))