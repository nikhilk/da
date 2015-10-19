// da.js
//

var request = require('request');

function getClientAccessToken(clientId, clientSecret, callback) {
  var options = {
    url: 'https://www.deviantart.com/oauth2/token',
    qs: {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials'
    },
    json: true
  };
 
  request.get(options, function(error, response, result) {
    if (error || !result.access_token) {
      callback(error);
    }
    else {
      callback(null, result.access_token);
    }
  });
}

module.exports = {
  token: getClientAccessToken
};

