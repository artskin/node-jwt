
const router = require("express").Router();
const User = require('../models/User');
const md5 = require('blueimp-md5')

router.post('/reg',(req,res,next)=>{
  const {username,password} = req.body;
  User.findOne({
    username:username
  },(err,result)=>{
    if(result){
      res.json({
        code:400,
        msg:'用户名已被占用'
      })
      return
    }
    
    let user = new User({
      _id: + new Date(),
      username:username,
      password:md5(new Buffer.from(username).toString('base64').substr(4) + global.SALT_KEY + password)
    })
    user.save()
    res.json({
      code:200,
      msg:'注册成功',
      ...req.body
    });
  })
})

module.exports = router