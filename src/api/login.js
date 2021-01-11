const express = require("express");
const router = express.Router();
const {createToken,verifyToken} = require('../token.js');
const userLists = [
  {
    id:1,
    name:'admin',
    role:'管理员',
    pwd:'admin123'
  },
  {
    id:2,
    name:'root',
    pwd:'root123'
  }
]
const currentIndex = 0;

router.post('/login',(req,res,next)=>{
  let loginInfo = req.body;
  const checkUser = (user)=>{
    if (user.name == loginInfo.uname && user.pwd == loginInfo.pwd){
      return true
    }else{
      return false
    }
  }
  const hasUser = userLists.find(checkUser)
  if(hasUser){
    let token = createToken(hasUser)
    res.json({
      code:200,
      token,
      msg:'登录成功',
    })
  }else{
    res.send({
      code:400,
      msg:'用户或密码不正确'
    })
  }
})

module.exports = router