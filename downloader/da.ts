// da.ts
// DeviantArt API wrappers
//

'use strict';

var request = require('request-promise');

async function getToken(clientId: string, clientSecret: string): Promise<string> {
  var options = {
    method: 'GET',
    url: 'https://www.deviantart.com/oauth2/token',
    qs: {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials'
    },
    transform: function(body: string): string {
      return JSON.parse(body).access_token;
    }
  };

  return request(options);
}

module.exports = {
  token: getToken
};

