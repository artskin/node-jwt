//const uri = "mongodb://localhost:27017/amudb"

module.exports = (app) => {
  const mongoose = require('mongoose');
  mongoose.Promise = global.Promise;
  const uri = "mongodb+srv://amu:hiccqiang521@cluster0.n8mbn.mongodb.net/testAm?retryWrites=true&w=majority"
  mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology:true } ,(err,client)=>{
    if(err){
      console.log('mongoDB连接失败',err)
    }else{
      console.log('mongoDB连接成功')
    }
  });
}