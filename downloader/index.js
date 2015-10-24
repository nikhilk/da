// index.js
// DeviantArt Downloader
//

var nomnom = require('nomnom');
var da = require('./da');

var optionsSpec = {
  user: {
    metavar: 'name',
    full: 'user',
    help: 'DeviantArt user name',
    required: true
  },
  clientId: {
    netavar: 'id',
    full: 'client-id',
    help: 'DeviantArt client ID',
    required: true
  },
  clientSecret: {
    metavar: 'secret',
    full: 'client-secret',
    help: 'DeviantArt client secret',
    required: true
  },
  source: {
    metavar: 'collection',
    help: 'Source collection.',
    default: 'Featured'
  },
  target: {
    metavar: 'dir',
    help: 'Target directory',
    required: true
  },
  artist: {
    flag: true,
    help: 'Create subdirectories for artist names',
    default: false
  }
};

var options = nomnom.script('downloader')
                     .options(optionsSpec)
                     .nocolors()
                     .parse();

function retrieveToken() {
  return da.token(options.clientId, options.clientSecret)
           .then(function(token) {
             options.token = token;
             return token;
           });
}

function retrieveCollections() {
  return da.collections(options.token, options.user)
           .then(function(collections) {
             options.sources = collections;
             return collections;
           });
}

function retrieveDeviations() {
  var source = options.sources[options.source];
  if (!source) {
    console.log('The specified source folder was not found.');
    return null;
  }

  return da.deviations(options.token, options.user, source)
           .then(function(deviations) {
             console.dir(deviations);
             return deviations;
           });
}

function main() {
  retrieveToken()
    .then(retrieveCollections)
    .then(retrieveDeviations)
    .catch(function(e) {
      console.log(e.error | e);
    });
}

main();

