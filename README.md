# Botkit Studio SDK

## Connecting to Botkit Studio
you will need to npm install 'botkit-studio-sdk'.
then in the file you wish to use it in you will need to require the library, and instantiate it with a config file as per the example below.

```javascript
var SDK = require('botkit-studio-sdk');
config = {studio_token: 'studio token from botkit studio goes here', studio_command_uri: 'custom command api goes here'};
var sdk = new SDK(config);
```

Note the studio token is required, as it will identify your bot. The command uri is optional, and you will only be using it of you have a private command api.

### Botkit Studio SDK Methods

#### sdk.evaluateTrigger(text)
This will return a promisified script that matches a trigger in your bots scripts at the Botkit Studio API

| Argument | Description
|--- |---
| text | This is the input string you want to evaluate for possible triggers.

Simple example to look for the hello script:
```javascript
var SDK = require('botkit-studio-sdk');
config = {studio_token: 'studio token from botkit studio goes here', studio_command_uri: 'custom command api goes here'};
var sdk = new SDK(config);
return sdk.evaluateTrigger('hello how are you');
```
This will evaluate the text against all of your bots script's triggers and return the hello command for your bot from the Botkit Studio API.

#### sdk.getScript(text)
This will return a promisified script that matches a specific script in your bots scripts at the Botkit Studio API.

| Argument | Description
|--- |---
| text | this is the string representation of a specific script you  wish to retrieve.

Simple example to get back the 'thank you' script:
```javascript
var SDK = require('botkit-studio-sdk');
config = {studio_token: 'studio token from botkit studio goes here', studio_command_uri: 'custom command api goes here'};
var sdk = new SDK(config);
return sdk.getScript('thank you');
```
This will return your bots 'thank you' command explicitly from the Botkit Studio API.
