const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded())

router.post('/reg',(req,res,next)=>{
  console.log(req.param.uname)
  console.log(req.route)
  console.log(req.params.uname)
  // res.send({
  //   code:200,
  //   msg:'注册成'
  // })
  res.send(req.body);
  //res.json({})
})

module.exports = router