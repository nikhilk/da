// sync.ts
// Synchronizes images by downloading new images.
//

'use strict';

var fs = require('fs'),
    path = require('path'),
    request = require('throttled-request')(require('request'));

// Throttle to 1 request per second.
request.configure({
  requests: 1,
  milliseconds: 1000
});

function downloadImage(img: data.Image): void {
  request(img.url)
    .pipe(fs.createWriteStream(img.path))
    .on('close', function() {
      console.log(img.path);
      fs.utimesSync(img.path, img.datetime, img.datetime);
    });
}

function syncImages(images: data.Image[]): void {
  images.filter(function(img: data.Image): boolean {
      return !fs.existsSync(img.path);
    })
    .forEach(function(img: data.Image): void {
      var dir = path.dirname(img.path);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      downloadImage(img);
    });
}

module.exports = {
  images: syncImages
};

