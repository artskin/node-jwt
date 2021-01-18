const jwt = require("jsonwebtoken");
const scret = "2020atdataname";

//生成token
const createToken = (info)=>{
  let token = jwt.sign(info,scret,{
    expiresIn: 60  * 10
  })
  return token
}

//验证token
const verifyToken = (token) =>{
  return new Promise((resolve,reject)=>{
    jwt.verify(token,scret,(err,result)=>{
      console.log('校验结果',err,result)
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
}

module.exports = {createToken,verifyToken}