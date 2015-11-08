// main.ts
// Command line implementation
//

'use strict';

var nomnom = require('nomnom');

function getOptions(): data.Options {
  return <data.Options> nomnom.script('sync')
    .option('path', {
      metavar: 'path',
      help: 'Favorites path',
      required: true
    })
    .nocolors()
    .parse();
}

module.exports = {
  options: getOptions
};

