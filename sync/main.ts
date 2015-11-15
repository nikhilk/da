// main.ts
// Application implementation
//

'use strict';

var fs = require('fs'),
    nomnom = require('nomnom'),
    path = require('path'),
    request = require('request-promise');
var cli = require('./cli');

interface FileCallback {
  (file: string): Promise<string>;
}

function filterFile(file: string): boolean {
  var ext = path.extname(file);
  if (ext != '.txt') {
    return false;
  }

  var jpg = file.replace(ext, '.jpg');
  if (fs.existsSync(jpg)) {
    return false;
  }

  return true;
}

async function enumerateFiles(dir: string, cb: FileCallback):
    Promise<string[]> {
  return new Promise<any>((resolve, reject) => {
    var results: string[] = [];

    fs.readdir(dir, async function(e: Error, files: string[]) {
      if (files) {
        for (var i = 0; i < files.length; i++) {
          var fullPath = path.join(dir, files[i]);

          if (fs.statSync(fullPath).isDirectory()) {
            results = results.concat(await enumerateFiles(fullPath, cb));
          }
          else if (filterFile(fullPath)) {
            results.push(await cb(fullPath));
          }
        }
      }

      resolve(results);
    });
  });
}

async function downloadImage(metadataFile: string): Promise<string> {
  var metadata = JSON.parse(fs.readFileSync(metadataFile, { encoding:'utf8' }));
  var ext = path.extname(metadata.url);
  var imgFile = metadataFile.replace('.txt', ext);

  console.log(metadata.url + ' -> ' + imgFile);

  return new Promise<string>((resolve, reject) => {
    var req = request(metadata.url);
    req.pipe(fs.createWriteStream(imgFile));
    req.on('end', function() {
      resolve(imgFile);
    });
  });
}

async function main() {
  var options = cli.options();
  var dir = path.join(process.cwd(), options.path);

  var images = await enumerateFiles(dir, downloadImage);
  console.log('----');
  images.forEach(function(i) { console.log(i); });
}


(async function() {
  try {
    await main();
  }
  catch (e) {
    console.log(e);
  }
})();

