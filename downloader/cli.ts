// main.ts
// Command line implementation
//

'use strict';

var nomnom = require('nomnom');

function getOptions(): data.Options {
  return <data.Options> nomnom.script('downloader')
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

module.exports = {
  options: getOptions
};

