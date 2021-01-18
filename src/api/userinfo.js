const router = require("express").Router();
const User = require('../models/User');

router.get('/userinfo',(req,res,next)=>{
  let loginInfo = req.query;
  User.findOne({_id:Number(loginInfo.id)},(err,doc)=>{
    console.log('登录结果',doc)
    if(doc){
      res.json({
        code:200,
        ...doc._doc,
        msg:'成功'
      })
    }else{
      res.json({
        code:400,
        msg:'用户或密码不正确'
      })
    }
  });
})

module.exports = router