const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/amudb"

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("runoob");
  var myobj = { name: "菜鸟教程", url: "www.runoob" };
  dbo.collection("site").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("文档插入成功");
      db.close();
  });
});

// const mongoose = require('mongoose');
// mongoose.connect(url)

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://amu:<hiccQiang521>@cluster0.n8mbn.mongodb.net/<atest>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log('链接成功')
//   // perform actions on the collection object
//   client.close();
// });