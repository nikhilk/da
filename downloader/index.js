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

function main() {
  da.token(options.clientId, options.clientSecret)
    .then(function(token) {
      da.collections(token, options.user)
        .then(function(collections) {
          var collection = collections[options.source];
          if (!collection) {
            console.log('The specified source folder was not found.');
          }
          else {
            da.deviations(token, options.user, collection)
              .then(function(deviations) {
                console.dir(deviations);
              })
              .catch(function(reason) {
                console.log('The specified source folder could not be listed.');
                console.log(reason.error | reason);
              });
          }
        })
        .catch(function(reason) {
          console.log('Failed to retrieve collections.');
          console.log(reason.error | reason);
        });
    })
    .catch(function(reason) {
      console.log('Failed to retrieve token.');
      console.log(reason.error | reason);
    });
}

main();

