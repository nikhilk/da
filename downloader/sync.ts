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

function updateImage(img: data.Image, ext: string, file: string): void {
  if (ext == '.jpg') {
    fs.utimesSync(file, img.datetime, img.datetime);
    return;
  }

  lwip.open(file, function(e:Error, image: any) {
    if (!e) {
      var jpgFile = file.replace(ext, '.jpg');
      var jpgInfo = { quality: 95 };
      image.writeFile(jpgFile, 'jpg', jpgInfo, function(e: Error) {
        if (!e) {
          fs.unlinkSync(file);
          fs.utimesSync(jpgFile, img.datetime, img.datetime);
        }
      });
    }
  });
}

function downloadImage(img: data.Image): void {
  console.log(img.url);

  var file = img.path;
  delete img.path;

  var ext = path.extname(file);
  var md = file.replace(ext, '.txt');
  fs.writeFileSync(md, JSON.stringify(img, null, 2), { encoding: 'utf8' });

  var stream = fs.createWriteStream(file);
  request(img.url)
    .pipe(stream)
    .on('finish', function() {
      stream.close(function() { updateImage(img, ext, file); });
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

