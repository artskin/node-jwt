const router = require("express").Router();
const {createToken,verifyToken} = require('../token.js');
const User = require('../models/User');


router.get('/userinfo',(req,res,next)=>{
  let loginInfo = req.params;
  
  User.findOne(loginInfo,(err,doc)=>{
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