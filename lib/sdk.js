var request = require('request');
var Promise = require('promise');

function SDK(config){
  sdk = {};
  sdk.config = config;

  sdk.studioAPI = function(options){
    if(!sdk.config.studio_token || sdk.config.studio_token === null){
      throw new Error('No Botkit Studio Token');
    }
    var _STUDIO_COMMAND_API = sdk.config.studio_command_uri || 'https://api.botkit.ai';
    options.uri = _STUDIO_COMMAND_API + options.uri;

    return new Promise(function(resolve, reject){
      var headers = {
          'content-type': 'application/json',
      };
      options.uri = options.uri + '?access_token=' + sdk.config.studio_token;
      options.headers = headers;
      request(options, function(err, res, body) {
        if (err) {
          return reject(err);
        }

        try {
          json = JSON.parse(body);
          if (json.error) {
            reject(json.error);
          } else {
            resolve(json);
          }
        } catch (e) {
          return reject('Invalid JSON');
        }
      });

    });
  };

  sdk.evaluateTrigger = function(text, user) {
    var url = '/api/v1/commands/triggers';
    if (text && user) {
      return sdk.studioAPI({
          uri: url,
          method: 'post',
          form: {triggers: text, user: user},
      });
    } else {
      // no input to evaluate
      return new Promise(function(resolve, reject) { reject(); }); 
    }
  };

  sdk.getScript = function(text, user) {
      var url = '/api/v1/commands/name';
      if (text && user) {      
        return sdk.studioAPI({
            uri: url,
            method: 'post',
            form: {command: text, user: user},
        });
      } else {
        // no input to evaluate
        return new Promise(function(resolve, reject) { reject(); }); 
      }
  };

  return sdk;
}

module.exports = SDK;
