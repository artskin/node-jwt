const router = require("express").Router();
const md5 = require('blueimp-md5')

const {createToken} = require('../token.js');
const User = require('../models/User');

router.post('/refresh_token',(req,res,next)=>{
  //let loginInfo = req.body;
  const {username,password} = req.body;
  const loginInfo ={
    username:username,
    password:md5(new Buffer.from(username).toString('base64').substr(4) + global.SALT_KEY + password)
  }
  //TODO:refresh_token
  console.log(loginInfo)
  User.findOne(loginInfo,(err,result)=>{
    if(result){
      console.log(result)
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