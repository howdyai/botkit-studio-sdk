var request = require('request');
var Promise = require('promise');

var SDK = function(studio_token, command_uri){
  var st = studio_token;
  var cu = command_uri;
};

SDK.prototype.studioAPI = function(options){
  if(!SDK.st || SDK.st === null){
    throw new Error('No Botkit Studio Token');
  }
  var _STUDIO_COMMAND_API = cu || 'https://api.botkit.ai';
  options.uri = _STUDIO_COMMAND_API + options.uri;
  return new Promise(function(resolve, reject){
    var headers = {
        'content-type': 'application/json',
    };
    options.uri = options.uri + '?access_token=' + SDK.st;
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

SDK.prototype.evaluateTrigger = function(text) {
    var url = '/api/v1/commands/triggers';
    return SDK.prototype.studioAPI({
        uri: url,
        method: 'post',
        form: {triggers: text},
    });
};


SDK.prototype.get = function(text) {
    var url = '/api/v1/commands/name';
    return SDK.prototype.studioAPI({
        uri: url,
        method: 'post',
        form: {command: text},
    });
};

module.exports = new SDK(studio_token, command_uri);
