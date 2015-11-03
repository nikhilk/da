// main.ts
// Application implementation
//

'use strict';

var nomnom = require('nomnom'),
    path = require('path');
var cli = require('./cli'),
    da = require('./da'),
    sync = require('./sync');

var options: data.Options = null;

function filterDeviations(d: data.Deviation): boolean {
  return !!d;
}

function createImage(d: data.Deviation): data.Image {
  var timestamp = new Date(d.time * 1000);
  var file = d.id + path.extname(d.src);
  var location = options.artists ? path.join(options.target, d.artist, file) :
                                   path.join(options.target, file);

  return {
    url: d.src,
    path: location,
    source: d.url,
    description: d.title,
    artist: d.artist,
    datetime: timestamp
  };
}

async function main() {
  options = cli.options();

  var token = await da.token(options.client, options.secret);
  var collections = await da.collections(token, options.user);

  var collection = collections.find(function(c: data.Collection) {
    return c.name == options.source;
  });
  if (!collection) {
    console.log('The specified collection source was not found.');
    return;
  }

  var deviations = await da.deviations(token, options.user, collection.id);
  var images = deviations.filter(filterDeviations).map(createImage);

  sync.images(images);
}


(async function() {
  try {
    await main();
  }
  catch (e) {
    console.log(e);
  }
})();


