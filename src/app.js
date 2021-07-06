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
// const path = require('path')
// console.log(path.resolve(__dirname),'public')
 console.log(app.static)
//vue ssr 渲染
const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer({
  template:require('fs').readFileSync(`./public/vue.ssr.tmpl.html`,'utf-8')
});
app.use((req,res,next)=>{
  if(req.url.includes('ssr')){
    const ssrApp = new Vue({
      data:{
        url:req.url
      },
      template:`<div>hello ssr vue dom,你访问的是{{url}}</div>`
    })
    const context = {
      title:'Vue SSR Renderer ',
      meta:`<meta name="author" content="Web Layout:amu"/>`
    }

    renderer.renderToString(ssrApp,context,(err,html)=>{
      if(err) throw err;
      
      res.end(html)
    })

  }
})

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

server.listen(3100,()=>{
  console.log('Server started on port http://localhost:3000')
})

require('./db/index')(app);

require('./ws/server')
