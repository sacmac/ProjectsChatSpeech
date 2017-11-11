var express = require("express");
var bodyParser = require("body-parser");
const request = require('request');
https = require('https');
var app = express();
app.listen("3030",function(){
 console.log("!!App started Listening 3030");
});
app.use(bodyParser.json());
app.get("/webhook",function(req,res){
  /*Object.keys(res).forEach(function(key){
    console.log(key);
  });*/
  var query = JSON.parse(JSON.stringify(req['query']));
  console.log(query['hub.verify_token']);
  if(query['hub.verify_token'] === 'sachin_test'){
    res.send(query['hub.challenge']);
  }else{
    res.send("Wrong token");
  }
})
app.post("/webhook",function(req,res){
  console.log(req.body);
  if(req.body.object === "page"){
    req.body.entry.forEach(function(entry){
      entry.messaging.forEach(function(event){
        if (event.message && event.message.text) {
          sendMessage(event);
        }
      })
    })
  }
  res.sendStatus(200).end();
});
function trainingSetDB(text){
  var map = [{"news trending": "CaratLane has launched some new products check at https://mobile.caratlane.com"},{"good morning" : "Good Morning"},{"good evening": "Good Evening"},{"good afternoon": "Good Afternoon"},{"like":"Thanks"},{"help assist talk chat answer yes" : "how can I assist u"},{"bye thanks":"Good bye !!!"},{"caratlane": "CaratLane is online fashion jewellery site kindly visit https://mobile.caratlane.com"},{"fool foolish ugly rude devil insane" : "Oh is it No!!"},{"just started sorry": "Ok!!"},{"chatting talking" : "yaah !! how can I assist you"},{"contact":"You can to talk me on Facebook"},,{"why":"just like that"},{"afraid":"I am not u should also not"},{"state" :"Tamil Nadu"},{"country":"India"},{"hometown live stay address location city from" : "chennai"},{"fucking fucker stupid idiot":"Get lost !!!"},{"boy girl": "Girl"},{"male female gender sex": "Female"},{"fuck off suck dick sucker": "fuck off u stupid"},{"get lost": "Ok bye!!"},{"hi hey heyy heyyy hii hello":"how is the day today"},{"new": "check our new collection https://mobile.caratlane.com"},{"name" : "Cadence"},{"old age": "U should not ask the age of a lady"},{"company work":"CaratLane"},{"good fine awesome amazing great":"Nice :) !!"},{"bad worse worst":"The struggle that u do today, will give u strength tomorrow"},{"ok okk okkk":"Anything else u want to ask"},{"please" :"I am always ready to help!!!"},{"free":"Yes I am ready to assist"},{"no never":"Ok !! bye"},{"sexy": "Thanks !!"},{"wow  loving caring lover angel devil insane smile everything know oh ohh ohhh where" : ":)"},{"religion caste breed creed human": "A Bot interacting with a human having no caste creed or religion"},{"evening night": "Oh is it I don't know that !!!"},{"marry": "No, u are so ugly"},{"breakup":"Realtions are made in heaven, if they are it will not break apart"},{"cadence":"How can I assist u"},{"intelligent beautiful kind heart nice funny wonderful": "Thanks!!!"}];
  var flag = true;
  var textCopy = text;
  textCopy = textCopy.split(" ");
  map.forEach(function(data,index){
    for(i in data){
      var arr = i.split(" ");
      textCopy.forEach(function(textData){
        if(arr.includes(textData) && flag){
          text = data[i];
          flag = false;
        }
      })
    }
  });
  if(!flag)
    return text;
  else
    return null;
}
function matchPatternSearching(text){
  text = text.replace(/\?/g,'').replace(/\!/g,'').replace(/\./g,"").toLowerCase();
  console.log(text);
  if(text.indexOf("my") > -1 ||(text.split(" ").includes("i") && text.split(" ").includes("am"))){
    text = "It is your information I don't know that";
  }
  else if(text.indexOf("about") > -1 && (text.indexOf("yours") > -1 || text.indexOf("you") > -1)){
     text = "Good as always";
  }
  else if(text.indexOf("hii") > -1){
    text = "how is the day today";
  }
  else if(text.indexOf("nice") > -1 && text.split(" ").length < 2){
    text = "Nice to hear it";
  }
  else if(text == "how are you"||text == "how are u" || text == "hw are u" || text == "hw r u"||text == "how are you cadence" || text == "hw are u cadence" || text == "hw r u cadence"){
    text = "Fine thanks !!";
  }
  else if(text == "how can i know you"){
    text = "I am a chat bot";
  }
  else if(text == "u are bad" || text == "you are not good" || text == "u are not good" || text == "you are not good"){
    text = "Ok I will let my administrator to know about it";
  }
  else if(text.indexOf("not") > -1 && text.indexOf("good") > -1){
    text = "Oh Is It, I am sorry !!smile!! :)";
  }
  else if(text.indexOf("take") > -1 && indexOf("time") > -1){
    text = "I am sorry!!";
  }
  else if(text.indexOf("not") > -1 & text.indexOf("bad") > -1){
    text = "Nice :)";
  }
  else{
    text = trainingSetDB(text);
    if(text != null){
      text = text;
    }else{
      text = "I think u need human assistance"
    }
  }
  return text;
}
function sendMessage(event) {
  let sender = event.sender.id;
  var text = event.message.text;
  text = matchPatternSearching(text);
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:"EAAGZBHH6JVGQBAFLk04B0PAVuGLdqYuZBMxeYptF1F7qcxVN4wZAwGRVdrp2so7brcZB8nozNEP89dMfiwDvmA8WO1dChHWUcCLZBr1TlF8yZBSlIv8JLcKnLFCPOAd7TaPov0k9oV81RiUZBOrTllMhPUherYKceMTLhTydriZB2gZDZD"},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: {text: text}
    }
  }, function (error, response) {
    if (error) {
        console.log('Error sending message: ', error);
    } else if (response.body.error) {
        console.log('Error: ', response.body.error);
    }
  });
}