# Botkit Studio SDK

[Botkit Studio](https://studio.botkit.ai) is a hosted development tool for bot builders. Botkit Studio will substantially ease the development and deployment of a Bot, help to avoid common coding pitfalls,
and provide a valuable management interface for the bot's dialog content and configuration. Botkit Studio is a product of [Howdy.ai](http://howdy.ai), the creators of Botkit.

This SDK allows developers to use the Botkit Studio APIs _without using Botkit_.
This is useful for bot developers who have existing apps but would benefit from features like bot-specific content management.

## Install

Install the SDK from npm:

```
npm install --save botkit-studio-sdk
```

## Connecting to Botkit Studio

First, [register for a developer accont with Botkit Studio](https://studio.botkit.ai) and acquire an API token. This will identify your bot and grant your application
access to the APIs.

In your bot application, include the library and create an API client:

```javascript
var BKS = require('botkit-studio-sdk');
var bks_client = new BKS({
    studio_token: 'studio token from botkit studio goes here'
});
```


### Botkit Studio SDK Methods

#### bks_client.evaluateTrigger(input_text, user_id)
| Argument | Description
|--- |---
| input_text | This is the input string you want to evaluate for possible triggers.
| user_id | A unique user id representing the user whose input is being evaluated

This function uses Botkit Studio's trigger API to test _input text_ against all
of a bots configured triggers. If a trigger is matched, the matching script will be returned as a JSON object. Otherwise, an empty object will be returned.

Function returns a promise.

```javascript
var BKS = require('botkit-studio-sdk');
var bks_client = new BKS({
    studio_token: 'studio token from botkit studio goes here'
});
bks_client.evaluateTrigger('hello how are you', user_id).then(function(script_object) {
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

#### bks_client.getScript(script_name, user_id)
| Argument | Description
|--- |---
| script_name | The name of a script that exists in Botkit Studio
| user_id | A unique user id representing the user whose input is being evaluated

Returns a promise that, when resolved, receives a JSON object representing the
script identified by _script_name_.  

```javascript
var BKS = require('botkit-studio-sdk');
var bks_client = new BKS({
    studio_token: 'studio token from botkit studio goes here'
});
bks_client.getScript('thanks', user_id).then(function(script_object) {
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

#### bks_client.getScriptById(script_id, user_id)
| Argument | Description
|--- |---
| script_id | The id of a script that exists in Botkit Studio
| user_id | A unique user id representing the user whose input is being evaluated

Returns a promise that, when resolved, receives a JSON object representing the
script identified by script_id.  

```javascript
var BKS = require('botkit-studio-sdk');
var bks_client = new BKS({
    studio_token: 'studio token from botkit studio goes here'
});
bks_client.getScriptById('5a7381d85d49c200142ed7bf', user_id).then(function(script_object) {
    if (script_object.command) {
        // a trigger was matched, do something...
        // ... interpret the script object
    } else {
        // no matching trigger
    }
}).catch(function(err) {


});
```



#### bks_client.getScripts(optional_tag)
Returns a promise that, when resolved, receives a JSON array containing
all of the currently available scripts.

Optionally specify a tag value. If specified, only scripts with the specified tag will be returned.

```javascript
var BKS = require('botkit-studio-sdk');
var bks_client = new BKS({
    studio_token: 'studio token from botkit studio goes here'
});
bks_client.getScripts().then(function(script_list) {
  // script_list contains an array
}).catch(function(err) {


});
```

Response to getScripts will be in the format:
```
[
  {
    name: "script name",
    description: "script description",
    triggers: [
      {
        type: "string",
        pattern: "foo"
      }
    ]
  }
]
```

#### bks_client.createScript(trigger, text)
Create a simple script in Botkit Studio with a single trigger and one reply.

Returns a promise that, when resolved, receives an object representing the new script.


# Script Object Schema
A script JSON object from Botkit Studio API should look something like this:
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
