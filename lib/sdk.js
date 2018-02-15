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

        var json = null;

        try {
          json = JSON.parse(body);
        } catch(e) {
          return reject('Invalid JSON received from Botkit Studio API');
        }

        if (!json || json == null) {
          reject('Botkit Studio API response was empty or invalid JSON');
        } else if (json.error) {
          if(res.statusCode === 401){
            console.error(json.error);
          }
          reject(json.error);
        } else {
          resolve(json);
        }

      });

    });
  };

  sdk.identify = function() {
    var url = '/api/v2/bots/identify';
    return sdk.studioAPI({
        uri: url,
        method: 'get',
        form: {},
    });
  };

  sdk.evaluateTrigger = function(text, user) {
    var url = '/api/v1/commands/triggers';
    return sdk.studioAPI({
        uri: url,
        method: 'post',
        form: {triggers: text, user: user},
    });
  };

  sdk.getScript = function(text, user) {
      var url = '/api/v1/commands/name';
      return sdk.studioAPI({
          uri: url,
          method: 'post',
          form: {command: text, user: user},
      });
  };

  sdk.getScriptById = function(id, user) {
      var url = '/api/v1/commands/id';
      return sdk.studioAPI({
          uri: url,
          method: 'post',
          form: {id: id, user: user},
      });
  };

  sdk.getScripts = function(tag) {
    var url = '/api/v1/commands/list';
    if(tag){
      url = url + '?tag=' + tag;
    }
      return sdk.studioAPI({
          uri: url,
          method: 'get'
      });
  };

  sdk.createScript = function(trigger, text) {
      var url = '/api/v1/commands/create';
      return sdk.studioAPI({
          uri: url,
          method: 'post',
          form: {trigger: trigger, answer: text},
      });
  };


  return sdk;
}

module.exports = SDK;
