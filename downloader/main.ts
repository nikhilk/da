// main.ts
// Application implementation
//

'use strict';

var nomnom = require('nomnom');
var cli = require('./cli'),
    da = require('./da');

async function main() {
  var options = cli.options();

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


