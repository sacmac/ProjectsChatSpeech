What is a Chat Bot ?
Chat bot is trained to use the Natural Language Processing(NLP) to send the best possible answer for the query asked by the user.

Installation:-
Nodejs:-
NodeJS is required for this chat bot project.
Install nodejs

Ngrok:-
This actually exposes the localhost to the public by creating a tunnel from localhost to the public url it creates.
npm install ngrok
Steps:-
Install ngrok in the current project.
In order to create the Tunnel:-
Use command ./ngrok http portNumber
This will give two url's https://url and other https://url

APIAI:-
This is used to connect to the dialogflow where the bot is trained.
Overview:-
This basically uses the Natural Language Processing for processing the query based on the trained set that can be customized.
For more Details visit:- https://dialogflow.com/
Steps for installation:-
1)Sign to Dialog Flow using the google account.
2)Then on left hand side top corner click "CREATE AGENT", fill in the details, you can keep empty also except the Timezone.
3) Once that is done you will get the Agents APIID (client Id) and Developer Token.
4) Install npm install apiai add your clientId and developerToken can be used as sessionId as sessionId is required.

