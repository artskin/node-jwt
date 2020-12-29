const jwt = require("jsonwebtoken");
const scret = "21321dsadsadsdsd";

//生成token
const createToken = (info)=>{
  let token = jwt.sign(info,scret,{
    expiresIn: 60 * 60 * 10
  })
  return token
}

//验证token

const verifyToken = (token) =>{
  return new Promise((resolve,reject)=>{
    jwt.verify(token,scret,(err,result)=>{
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
}
module.exports = {createToken,verifyToken}