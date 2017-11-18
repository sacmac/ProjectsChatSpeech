var express = require("express");
var apiai  = require("apiai");
var resApp = apiai("xxxxxXXXXXX");
var bodyParser = require("body-parser");
const request = require('request');
https = require('https');
var app = express();
app.listen("3030",function(){
 console.log("!!App started Listening 3030");
});
app.use(bodyParser.json());
app.set("view engine","ejs");
app.use(express.static('public'));
app.get("/",function(req,res){
  res.render("speech",function(err,html){
    res.send(html);
  });
});
app.get("/sendRequest",function(req,res){
  //console.log("requesting ...."+req.body)
  console.log("query=="+((req.query.data)));
  var text = sendMessage(req.query.data,res);
  console.log("text=="+text);
});
function sendMessage(data,res) {
  var text = data
  var request = resApp.textRequest(text, {
    sessionId: 'XXXXXXXXXXXXX04b'
  });
  request.on('response',function(response){
    var res_t = JSON.parse(JSON.stringify(response));
    console.log("Response from the api=="+ res_t.result.fulfillment.messages[0]["speech"]);
    res_t = res_t.result.fulfillment.messages[0]["speech"];
    if(res_t == "male" || res_t == "boy" || res_t == "man"){
      text = "Hello Sir, how can I assist you";
    }
    else if(res_t == "woman" || res_t == "female" || res_t == "girl"){
      text = "Hello Mam, how can I assist you";
    }
    else{
      text = res_t;
    }
    res.send(text);
    //sendToFacebookRespone(sender,text);
  })
  request.on('error',function(error){
    console.log("API AI has an error"+error);
  })
  request.end();
  //text = matchPatternSearching(text);
}