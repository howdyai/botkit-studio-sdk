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

if (script_object) {
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
bks_client.getScript('thank you').then(function(script_object) {

// interpret script object

}).catch(function(err) {


});
```
This will return your bots 'thank you' command explicitly from the Botkit Studio API.


# Script Object Schema

```
here is some json
```
