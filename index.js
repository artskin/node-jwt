const express = require("express");
const app = express();
const reg = require('./src/api/reg')
const login = require('./src/api/login')
const userinfo = require('./src/api/userinfo')
const port = 5000;

// Body parser
app.use(express.urlencoded({ extended: false }));

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to a basic express App");
});

// Mock API
app.get("/users", (req, res) => {
  res.json([
    { name: "William", location: "Abu Dhabi" },
    { name: "Chris", location: "Vegas" }
  ]);
});
app.use(express.static('public'))
app.post("/user", (req, res) => {
  const { name, location } = req.body;

  res.send({ status: "User created", name, location });
});
app.use('/api', reg)
app.use('/api', login)
app.use('/api', userinfo)
// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is booming on port 5000
Visit http://localhost:5000`);
});