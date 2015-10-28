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

async function getCollectionsPaged(token: string, user: string, offset: number): Promise<any> {
  var options = {
    url: 'https://www.deviantart.com/api/v1/oauth2/collections/folders',
    qs: {
      access_token: token,
      username: user,
      mature_content: true,
      calculate_size: 'no',
      ext_preload: 'no',
      offset: offset,
      limit: 50
    },
    transform: function(body: string): any {
      var items: data.Collection[] = [];

      var data: any = JSON.parse(body);
      data.results.forEach(function(item: any): void {
        items.push({
          name: item.name,
          id: item.folderid
        });
      });

      return {
        items: items,
        more: data.has_more,
        next: data.next_offset
      };
    }
  };

  return request(options);
}

async function getCollections(token: string, user: string): Promise<data.Collection[]> {
  var collections: data.Collection[] = [];

  var offset = 0;
  while (true) {
    var data: any = await getCollectionsPaged(token, user, offset);

    offset = data.next;
    collections = collections.concat(<data.Collection[]> data.items);

    if (!data.more) {
      break;
    }
  }

  return collections;
}

async function getDeviationsPaged(token: string, user: string, collection: string, offset: number): Promise<any> {
  var options = {
    url: 'https://www.deviantart.com/api/v1/oauth2/collections/' + collection,
    qs: {
      access_token: token,
      username: user,
      mature_content: true,
      offset: offset,
      limit: 24
    },
    transform: function(body: string): any {
      var data: any = JSON.parse(body);

      var items: data.Deviation[] =
        data.results.map(function(item: any): data.Deviation {
          return {
            id: item.deviationid,
            url: item.url,
            title: item.title,
            time: item.published_time,
            artist: item.author.username,
            src: item.content.src
          };
        });

      return {
        items: items,
        more: data.has_more,
        next: data.next_offset
      };
    }
  };

  return request(options);
}

async function getDeviations(token: string, user: string, collection: string): Promise<data.Deviation[]> {
  var deviations: data.Deviation[] = [];

  var offset = 0;
  while (true) {
    var data: any = await getDeviationsPaged(token, user, collection, offset);

    offset = data.next;
    deviations = deviations.concat(<data.Deviation[]> data.items);

    if (!data.more) {
      break;
    }
  }

  return deviations;
}


module.exports = {
  token: getToken,
  collections: getCollections,
  deviations: getDeviations
};

