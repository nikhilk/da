// loop.js
//

var Promise = require('bluebird');

function deferLoop(condition, action) {
  var deferred = Promise.defer();

  var loop = function(result) {
    if (!condition()) {
      return deferred.resolve(result);
    }

    return Promise.cast(action())
                  .then(loop)
                  .catch(deferred.reject);
  };

  process.nextTick(loop);
  return deferred.promise;
}

Promise.deferLoop = deferLoop;

module.exports = Promise;

