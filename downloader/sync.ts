// sync.ts
// Synchronizes images by downloading new images.
//

'use strict';

var fs = require('fs'),
    lwip = require('lwip'),
    path = require('path'),
    request = require('throttled-request')(require('request'));

// Throttle to 1 request per second.
request.configure({
  requests: 1,
  milliseconds: 1000
});

function downloadImage(img: data.Image): void {
  console.log(img.url);

  var file = img.path;
  delete img.path;

  var ext = path.extname(file);
  var md = file.replace(ext, '.txt');
  fs.writeFileSync(md, JSON.stringify(img, null, 2), { encoding: 'utf8' });

  request(img.url)
    .pipe(fs.createWriteStream(file))
    .on('close', function() {
      if (ext != '.jpg') {
        lwip.open(file, function(e:Error, image: any) {
          if (!e) {
            var jpgFile = file.replace(ext, '.jpg');
            image.writeFile(jpgFile, 'jpg', {quality: 95}, function(e: Error) {
              if (!e) {
                fs.unlinkSync(file);
                fs.utimesSync(jpgFile, img.datetime, img.datetime);
              }
            });
          }
        });
      }
      else {
        fs.utimesSync(file, img.datetime, img.datetime);
      }
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

