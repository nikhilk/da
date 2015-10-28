// main.ts
// Application entrypoint implementation
//

'use strict';

var nomnom = require('nomnom');
var da = require('./da');

interface Options {
  client: string;
  secret: string;
  user: string;
  source: string;
  target: string;
  artists: boolean;
}

function getOptions(): Options {
  return <Options> nomnom.script('downloader')
    .option('client', {
      metavar: 'id',
      full: 'client',
      help: 'DeviantArt client ID',
      required: true
    })
    .option('secret', {
      metavar: 'secret',
      full: 'secret',
      help: 'DeviantArt client secret',
      required: true
    })
    .option('user', {
      metavar: 'name',
      full: 'user',
      help: 'DeviantArt user name',
      required: true
    })
    .option('source', {
      metavar: 'collection',
      help: 'Source collection.',
      default: 'Featured'
    })
    .option('target', {
      metavar: 'dir',
      help: 'Target directory',
      required: true
    })
    .option('artists', {
      flag: true,
      help: 'Create subdirectories for artist names',
      default: false
    })
    .nocolors()
    .parse();
}

async function main() {
  var options = getOptions();

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
  console.dir(deviations);
}

(async function() {
  try {
    await main();
  }
  catch (e) {
    console.log(e);
  }
})();


