const router = require("express").Router();
const {createToken} = require('../token.js');
const User = require('../models/User');
const md5 = require('blueimp-md5')

const svgCaptcha = require('svg-captcha')
let captchaValue = ''

router.get('/captcha',(req,res,next)=>{
  let captcha = svgCaptcha.create({
    height:40,
    size: 6,
    noise: 3,
    charPreset:'@#$%ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  });
  captchaValue = captcha.text

  let data = `data:image/svg+xml;base64,${new Buffer.from(unescape(encodeURIComponent(captcha.data))).toString('base64')}`;

  res.json({
    code:200,
    data:data
  })
  //res.send(captcha.data)
})

router.post('/login',(req,res,next)=>{
  const {username,password,captcha} = req.body;
  if(captcha !==captchaValue){
    res.send({
      code:400,
      msg:'验证码不正确'
    })
    return
  }
  captchaValue = null;
  const loginInfo ={
    username:username,
    password:md5(new Buffer.from(username).toString('base64').substr(4) + global.SALT_KEY + password)
  }
  //console.log(loginInfo)
  User.findOne(loginInfo,(err,result)=>{
    if(result){
      //console.log(result)
      let token = createToken(loginInfo);
      res.json({
        code:200,
        id:result._id,
        token,
        msg:'登录成功',
      });
    }else{
      res.send({
        code:400,
        msg:'用户或密码不正确'
      })
    }
  });

})

module.exports = router