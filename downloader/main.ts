// main.ts
// Application entrypoint implementation
//

'use strict';

var nomnom = require('nomnom');
var da = require('./da');

interface Options {
  clientId: string;
  clientSecret: string;
  user: string;
  source: string;
  target: string;
  artists: boolean;

  token?: string;
}

function getOptions(): Options {
  return {
    clientId: '',
    clientSecret: '',
    user: '',
    source: '',
    target: '',
    artists: false,
  };
}

async function main() {
  var options = getOptions();
  options.token = await da.token(options.clientId, options.clientSecret);

  console.log(options.token);
}

(async function() {
  try {
    await main();
  }
  catch (e) {
    console.log(e);
  }
})();


