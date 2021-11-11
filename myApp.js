var express = require('express');
let bodyParser = require("body-parser");
var app = express();
let absolutePath = __dirname + "/views/index.html";

app.use(bodyParser.urlencoded({extended: false}))
app.use("/public", express.static(__dirname +"/public"));

app.use((req,res,next) => {
  let {method,path,ip} = req;
  console.log(req.method +" " + req.path + " - " + req.ip)
  next();
})
//app.get("/", (req,res)=>{
//res.send("Hello Express")
//})

app.get("/", (req,res)=>{
  res.sendFile(absolutePath)
})



app.get("/:word/echo", (req,res)=>{
  res.json({echo: req.params.word})
})

app.get("/name",(req,res)=>{
  res.json({name:req.query.first + " " + req.query.last})
})

app.post("/name", (req,res)=>{

  res.json({name: req.body.first + " " + req.body.last})
  console.log(req.body);
})
 
app.get("/json", (req,res)=>{
  res.json({"message": process.env.MESSAGE_STYLE == "uppercase" ? "HELLO JSON": "Hello json"})
})

app.get("/now", (req,res,next) => {
  req.time = new Date().toString();
  next();
}, (req,res) => {
  res.json({time: req.time});

})

console.log("Hello World");


 module.exports = app;
