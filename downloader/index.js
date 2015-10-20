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
    help: 'Source collection. All if unspecified.',
    default: '<all>'
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
      console.log(token);

      da.collections(token, options.user)
        .then(function(collections) {
          console.log(collections);
        })
        .catch(function(reason) {
          console.log('Failed to retrieve collections.');
          console.log(reason.error);
        });
    })
    .catch(function(reason) {
      console.log('Failed to retrieve token.');
      console.log(reason.error);
    });
}

main();

