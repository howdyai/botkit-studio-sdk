var request = require('request');
var Promise = require('promise');

function SDK(c){
  sdk = {};
  sdk.config = {
    studio_token: c.studio_token,
    command_uri: c.studio_command_uri
  };

  sdk.studioAPI = function(options){
    // console.log('```````````````````````````studioAPI`````````````````````````````````');
    // console.log('options: ', options);
    if(!sdk.config.studio_token || sdk.config.studio_token === null){
      throw new Error('No Botkit Studio Token');
    }
    var _STUDIO_COMMAND_API = sdk.config.command_uri || 'https://api.botkit.ai';
    options.uri = _STUDIO_COMMAND_API + options.uri;
    // console.log('sdk.config: ', sdk.config);
    // console.log('options: ', options);

    return new Promise(function(resolve, reject){
      var headers = {
          'content-type': 'application/json',
      };
      options.uri = options.uri + '?access_token=' + sdk.config.studio_token;
      options.headers = headers;
      request(options, function(err, res, body) {
          if (err) {
              console.log('Rejecting because of error!',err);
              return reject(err);
          }
          try{
            json = JSON.parse(body);
            if (json.error) {
                console.log('Rejecting because JSON error', json.error);
                reject(json.error);
            } else {
                resolve(json);
            }
          }
          catch(e) {
            console.log('Rejecting because JSON error', e);
            return reject('Invalid JSON');
          }
      });

    });
  };

  sdk.evaluateTrigger = function(text, user) {
    console.log('text: ', text);
    var url = '/api/v1/commands/triggers';
    console.log('url: ', url);
    return sdk.studioAPI({
        uri: url,
        method: 'post',
        form: {triggers: text, user: user},
    });
  };

  sdk.getScript = function(text) {
      var url = '/api/v1/commands/name';
      return sdk.studioAPI({
          uri: url,
          method: 'post',
          form: {command: text},
      });
  };

  return sdk;
}

module.exports = SDK;
