// const MongoClient = require('mongodb').MongoClient
// const url = "mongodb://localhost:27017/amudb"

// // MongoClient.connect(url, function(err, db) {
// //   console.log(db)
// //   if (err) throw err;
// //   var dbo = db.db("runoob");
// //   var myobj = { name: "菜鸟教程", url: "www.runoob" };

// //   // dbo.collection("site").insertOne(myobj, function(err, res) {
// //   //   if (err) throw err;
// //   //   console.log("文档插入成功");
// //   //   db.close();
// //   // });
// // });

// const mongoose = require('mongoose');
// mongoose.connect(url)

// const User = mongoose.model('User',{name:String});

// const user_a = new User({name:'aaa'});
// user_a.save().then(()=>{
//   console.log('成功')
// })

// // const client = new MongoClient(uri, { useNewUrlParser: true });
// // client.connect(err => {
// //   const collection = client.db("test").collection("devices");
// //   console.log('链接成功')
// //   // perform actions on the collection object
// //   client.close();
// // });