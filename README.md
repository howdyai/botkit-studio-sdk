# Botkit Studio SDK

## Connecting to Botkit Studio
you will need to npm install 'botkit-studio-sdk'.
then in the file you wish to use it in you will need to require the library, and instantiate it with a config file as per the example below.

```javascript
var BKS = require('botkit-studio-sdk');
config = {studio_token: 'studio token from botkit studio goes here'};
var bks_client = new BKS(config);
```

Note the studio token is required, as it will identify your bot.

### Botkit Studio SDK Methods

#### bks_client.evaluateTrigger(input_text)
This will return a promisified script that matches a trigger in your bots scripts at the Botkit Studio API

| Argument | Description
|--- |---
| input_text | This is the input string you want to evaluate for possible triggers.

Simple example to look for the hello script:
```javascript
var BKS = require('botkit-studio-sdk');
config = {studio_token: 'studio token from botkit studio goes here'};
var bks_client = new BKS(config);
bks_client.evaluateTrigger('hello how are you').then(function(script_object) {
    // will always return a script_object.
    // if it couldnt find a script the script_object will be an empty object
    if (script_object.command) {
        // a trigger was matched, do something...
        // ... interpret the script object
    } else {
        // no matching trigger
    }
}).catch(function(err) {

    // an error occured while using the BKS API

});
```
This will evaluate the text against all of your bots script's triggers and return the hello command for your bot from the Botkit Studio API.

#### bks_client.getScript(script_name)
This will return a promisified script that matches a specific script in your bots scripts at the Botkit Studio API.

| Argument | Description
|--- |---
| script_name | this is the string representation of a specific script you  wish to retrieve.

Simple example to get back the 'thank you' script:
```javascript
var BKS = require('botkit-studio-sdk');
config = {studio_token: 'studio token from botkit studio goes here'};
var bks_client = new BKS(config);
bks_client.getScript('thanks').then(function(script_object) {
    // will always return a script_object.
    // if it couldnt find a script the script_object will be an empty object
    // interpret script object
    if (script_object.command) {
        // a trigger was matched, do something...
        // ... interpret the script object
    } else {
        // no matching trigger
    }

}).catch(function(err) {


});
```
This will return your bots 'thank you' command explicitly from the Botkit Studio API.


# Script Object Schema
A flattened script from Botkit Studio API should look something like this:
```
{  
   "command":"hello",
   "description":"Respond when a human says hello!",
   "triggers":[  
      {  
         "type":"string",
         "pattern":"hello"
      },
      {  
         "type":"string",
         "pattern":"hey"
      },
      {  
         "type":"string",
         "pattern":"hi"
      },
      {  
         "type":"string",
         "pattern":"howdy"
      }
   ],
   "variables":[  

   ],
   "script":[  
      {  
         "topic":"default",
         "script":[  
            {  
               "text":[  
                  "Hello Human!",
                  "How do you do?",
                  "Nice to meet you Human.",
                  "Hi!",
                  "How’s it going?",
                  "Hey!",
                  "Hey there!",
                  "Howdy!",
                  "G`day human!",
                  "Salut!",
                  "Ciao!",
                  "Hola!",
                  "Shalom!"
               ]
            },
            {  
               "text":[  
                  "You can edit it to customize my behaviors."
               ]
            },
            {  
               "action":"complete"
            }
         ]
      }
   ]
}
```
