// index.js
// DeviantArt Downloader
//

var nomnom = require('nomnom');
var da = require('./da');

var optionsSpec = {
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
  da.token(options.clientId, options.clientSecret,
           function(err, token) {
             console.log(token);
           });
}

main();

