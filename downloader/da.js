// da.js
//

var request = require('request-promise');
var Promise = require('./promise');

function getClientAccessToken(clientId, clientSecret) {
  var options = {
    url: 'https://www.deviantart.com/oauth2/token',
    qs: {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials'
    },
    transform: function(body) {
      return JSON.parse(body).access_token;
    }
  };
 
  return request.get(options);
}

function getCollectionsPaged(token, user, offset) {
  var options = {
    url: 'https://www.deviantart.com/api/v1/oauth2/collections/folders',
    qs: {
      access_token: token,
      username: user,
      calculate_size: 'no',
      ext_preload: 'no',
      offset: offset,
      limit: 50
    },
    transform: function(body) {
      var items = { };

      var data = JSON.parse(body);
      data.results.forEach(function(item) {
        items[item.name] = item.folderid;
      });

      return {
        items: items,
        more: data.has_more,
        next: data.next_offset
      };
    }
  };

  return request.get(options);
}

function getCollections(token, user) {
  var collections = { };
  var offset = 0;
  var more = true;

  function continueLoop() { return more; }
  function executeLoop() {
    return new Promise(function(resolve, reject) {
      getCollectionsPaged(token, user, offset)
        .then(function(result) {
          for (var c in result.items) {
            collections[c] = result.items[c];
          }

          offset = result.next;
          more = result.more;

          resolve(collections);
        })
        .catch(function(reason) {
          reject(reason.error);
        });
    });
  }

  return Promise.deferLoop(continueLoop, executeLoop);
}

module.exports = {
  token: getClientAccessToken,
  collections: getCollections
};

