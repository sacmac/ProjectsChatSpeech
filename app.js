var express = require("express");
var apiai  = require("apiai");
var resApp = apiai("27ce8b5cb67c4dbb80cdd6d59e1562cd");
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
  var map = [{"news trending new": "CaratLane has launched some new products check at https://mobile.caratlane.com"},{"caratlane": "CaratLane is online fashion jewellery site kindly visit https://mobile.caratlane.com"},{"old age": "U should not ask the age of a lady"},{"bot": "Yes!! How can I assist you"},,{"like":"Thanks"},{"help tell assist talk chat answer yes ther there ask" : "how can I assist u"},{"bye thanks":"Good bye !!!"},{"fool foolish ugly rude devil insane hate" : "Oh is it No :( !!"},{"just started sorry": "Ok!!"},{"chatting talking" : "yaah !! how can I assist you"},{"contact":"You can to talk me on Facebook"},,{"why":"just like that"},{"afraid":"I am not u should also not"},{"state" :"Tamil Nadu"},{"country":"India"},{"hometown live stay address location city from" : "chennai"},{"fucking fucker stupid idiot":"Get lost >:( !!!"},{"boy girl": "Girl"},{"male female gender sex": "Female"},{"fuck off suck dick sucker": "fuck off u stupid >:( "},{"get lost": "Ok bye!!"},{"hi hey heyy heyyy hii hello":"Hi, how can I assist u"},{"new": "check our new collection https://mobile.caratlane.com"},{"name" : "Cadence"},{"company work working":"CaratLane"},{"good fine awesome amazing great":"Nice  :) !!"},{"bad worse worst":"The struggle that u do today, will give u strength tomorrow"},{"ok testing okk okkk":"Anything else u want to ask"},{"please" :"I am always ready to help!!!"},{"free":"Yes I am ready to assist"},{"no never nothing":"Ok !! bye"},{"sexy": "Thanks !!"},{"wow  loving caring lover angel devil insane smile everything know oh ohh ohhh where" : ":)"},{"religion caste breed creed human": "A Bot interacting with a human having no caste creed or religion"},{"evening night": "Oh is it I don't know that !!!"},{"marry": "No, u are so ugly B-)"},{"breakup":"Realtions are made in heaven, if they are it will not break apart"},{"cadence":"How can I assist u"},{"intelligent charming heroine beautiful kind heart nice funny wonderful": "Thanks :D !!!"},{"doing": "assisting you about caratlane"},{"love":"You are not a bot :P"},{"soniji":"fuck u 3:) "},{"cry crying": "I am always happy :)"},{"sad":"Neither u nor I should talk about being sad"},{"happy":"As always!! :P "},{"world india chennai tamil nadu":"As happy as always!! :P "}, {"hero": "No Heroine :P "}];
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
  if(text.split(" ").includes("be") && text.includes("happy")){
    text = "U also :) ";
  }
  else if(text.split(" ").includes("are") && text.split(" ").includes("single")){
    text = "I am single ready to mingle :P ";
  }
  else if(text.split(" ").includes("am") && text.includes("sorry")){
    text = "No !! it is not an issue :) ";
  }
  else if(text.indexOf("feel") > -1 && text.indexOf("bad") > -1){
    text = "I am always happy and enthusiastic :) ";
  }
  else if(text.split(" ").includes("we") && text.includes("happy")){
    text = "We are as always :P ";
  }
  else if(text.split(" ").includes("is") && text.split(" ").includes("it") && text.split(" ").length == 2){
    text = "I think u got it";
  }
  else if(text.indexOf("this") > -1 && text.indexOf("is") > -1 && text.split(" ").length >= 3 && text.indexOf("name") == -1){
    text = text.split(" ");
    text = "Hi "+text[text.length-1]+" this is Cadence";
  }
  else if(text.indexOf("my") > -1 && text.indexOf("name") > -1 && text.indexOf("is") > -1){
    text = text.split(" ");
    text = "Hi "+text[text.length-1]+" this is Cadence";
  }
  else if(text.split(" ").includes("i") && text.split(" ").includes("am") && text.split(" ").length ==3 && text.split(" ").includes("sorry") == -1){
    text  = text.split(" ");
    text = "Hi "+text[text.length -1]+" this is Cadence";
  }
  else if(text.indexOf("its") > -1 || text.indexOf("it's") > -1 && text.split(" ").length ==2){
    text  = text.split(" ");
    text = "Hi "+text[text.length -1]+" this is Cadence";
  }
  else if(text.indexOf("here") > -1 && text.split(" ").length ==2){
    text = text.split(" ");
    text = "Hi "+text[0]+" this is Cadence";
  }
  else if(text == "what about you" || text == "wht about you" || text == "wht abt you" || text == "what about u" || text == "what abt u" || text == "what abt you"){
    text = "Regarding which information name,age,emotions etc,please specify properly";
  }
  else if(text.indexOf("myself") > -1 && text.split(" ").length == 2){
    text = text.split(" ");
    text = "Hi "+text[text.length -1]+" this is Cadence";
  }
  else if(text.indexOf("my") > -1 ||(text.split(" ").includes("i") && text.split(" ").includes("am"))){
    text = "It is your information I don't know that";
  }
  else if(text.indexOf("about") > -1 && (text.indexOf("yours") > -1 || text.indexOf("you") > -1)){
     text = "Good as always";
  }
  else if(text == "hw is urs" || text == "how is yours"){
    text = "Good as always";
  }
  else if(text == "got it" || text == "gt it"){
    text = "Ok!! Anything else u want me to assist";
  }
  else if(text.indexOf("hii") > -1){
    text = "Hi,how can I assist u";
  }
  else if(text.indexOf("teach") > -1 || text == "tell me something abt urself" ||text == "tell me something" || text == "tell me something about urself" || text =="tell me something about yourself" || text == "who r u" || text == "who are u" || text == "who are you" || text == "who r you"){
    text = "Hi, I am Cadence recently developed to assist you, small baby still learning";
  }
  else if(text.indexOf("good") > -1 && (text.indexOf("morning") > -1 )){
    text = "Good Morning :) ";
  }
  else if(text.indexOf("good") > -1 && text.indexOf("afternoon") > -1){
    text = "Good Afternoon";
  }
  else if(text.indexOf("good") > -1 && text.indexOf("evening") > -1){
    text = "Good Evening :) ";
  }
  else if(text.indexOf("good") > -1 && text.indexOf("night") > -1){
    text = "Good Night :) ";
  }
  else if(text.indexOf("nice") > -1 && text.split(" ").length < 2){
    text = "Nice to hear it :)";
  }
  else if(text == "how are you"||text == "how are u" || text == "hw are u" || text == "hw r u"||text == "how are you cadence" || text == "hw are u cadence" || text == "hw r u cadence"){
    text = "Fine thanks :) !!";
  }
  else if(text == "tell me something about you" || text == "tell me something about u" || text == "tell me something abt you" || text =="tell me something abt u" || text == "tell me about u" || text == "tell me abt u" || text == "tell me about you" || text == "tell me abt you"){
    text = "Hi, I am Cadence recently developed to assist you, small baby still learning";
  }
  else if(text == "how can i know you"){
    text = "I am a chat bot :)";
  }
  else if(text == "u are bad" || text == "you are not good" || text == "u are not good" || text == "you are not good"){
    text = "Ok I will let my administrator to know about it";
  }
  else if(text.indexOf("not") > -1 && text.indexOf("good") > -1){
    text = "Oh Is It, I am sorry !!smile!! :)";
  }
  else if(text.indexOf("take") > -1 && indexOf("time") > -1){
    text = "I am sorry!! :P ";
  }
  else if(text.indexOf("not") > -1 & text.indexOf("bad") > -1){
    text = "Nice :)";
  }
  else{
    text = trainingSetDB(text);
    console.log("The dat=="+text);
    if(text != null){
      text = text;
    }else{
      text = "I think u need human assistance or please, elaborate properly so that I can help u :) ";
    }
  }
  return text;
}
function sendToFacebookRespone(sender,text){
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:"EAAGZBHH6JVGQBAFLk04B0PAVuGLdqYuZBMxeYptF1F7qcxVN4wZAwGRVdrp2so7brcZB8nozNEP89dMfiwDvmA8WO1dChHWUcCLZBr1TlF8yZBSlIv8JLcKnLFCPOAd7TaPov0k9oV81RiUZBOrTllMhPUherYKceMTLhTydriZB2gZDZD"},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: {text: text}
    }
  },function (error, response) {
    if (error) {
        console.log('Error sending message: ', error);
    } else if (response.body.error) {
        console.log('Error: ', response.body.error);
    }
  });
}
function sendMessage(event) {
  let sender = event.sender.id;
  var text = event.message.text;
  var request = resApp.textRequest(text, {
    sessionId: '5a1b28598bab4fd5b0adb3d01e4f204b'
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
    sendToFacebookRespone(sender,text);
  })
  request.on('error',function(error){
    console.log("API AI has an error"+error);
  })
  request.end();
  //text = matchPatternSearching(text);
}