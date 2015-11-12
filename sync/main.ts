// main.ts
// Application implementation
//

'use strict';

var fs = require('fs'),
    nomnom = require('nomnom'),
    path = require('path');
var cli = require('./cli');

interface Callback<T> {
  (e: Error, result: T): void
}

function enumerateFiles(dir: string, cb: Callback<string>): void {
  fs.readdir(dir, function(e: Error, files: string[]) {
    if (e) {
      console.log(e);
      return;
    }

    files.forEach(function(file) {
      var fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        enumerateFiles(fullPath, cb);
        return;
      }

      var ext = path.extname(fullPath);
      if (ext != '.txt') {
        return;
      }

      var img = fullPath.replace(ext, '.jpg');
      if (fs.existsSync(img)) {
        return;
      }

      cb(null, fullPath);
    });
  });
}

async function main() {
  var options = cli.options();

  var dir = path.join(process.cwd(), options.path);
  enumerateFiles(dir, function(e: Error, file: string) {
    if (file) {
      console.log(file);
    }
  });
}


(async function() {
  try {
    await main();
  }
  catch (e) {
    console.log(e);
  }
})();

