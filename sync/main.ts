// main.ts
// Application implementation
//

'use strict';

var fs = require('fs'),
    nomnom = require('nomnom'),
    path = require('path');
var cli = require('./cli');

interface FileCallback<T> {
  (file: string): Promise<any>;
}

function filterFile(file: string): boolean {
  var ext = path.extname(file);
  if (ext != '.txt') {
    return false;
  }

  var img = file.replace(ext, '.jpg');
  if (fs.existsSync(img)) {
    return false;
  }

  return true;
}

async function enumerateFiles(dir: string, cb: FileCallback<string>):
    Promise<any> {
  return new Promise<any>((resolve, reject) => {
    fs.readdir(dir, async function(e: Error, files: string[]) {
      if (files) {
        for (var i = 0; i < files.length; i++) {
          var fullPath = path.join(dir, files[i]);
          if (fs.statSync(fullPath).isDirectory()) {
            await enumerateFiles(fullPath, cb);
          }
          else if (filterFile(fullPath)) {
            await cb(fullPath);
          }
        }
      }

      resolve(null);
    });
  });
}

async function downloadImage(metadataFile: string): Promise<any> {
  var metadata = JSON.parse(fs.readFileSync(metadataFile, { encoding:'utf8' }));
  var imgFile = metadataFile.replace('.txt', '.jpg');

  return new Promise<any>((resolve, reject) => {
    console.log(metadata.url + ' -> ' + imgFile);
    resolve(null);
  });
}

async function main() {
  var options = cli.options();
  var dir = path.join(process.cwd(), options.path);

  await enumerateFiles(dir, downloadImage);
}


(async function() {
  try {
    await main();
  }
  catch (e) {
    console.log(e);
  }
})();

