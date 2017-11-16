var express = require("express");
var bodyParser = require("body-parser");
const request = require('request');
var app = express();
app.use(express.static('javascripts'));
app.listen("3030",function(){
 console.log("!!App started Listening 3030");
});
app.set("view engine","ejs");
app.use(bodyParser.json());
app.get("/speech",function(req,res){
  res.render("speech");
});