// imaging.ts
// Image helper functionality
//

'use strict';

var fs = require('fs'),
    lwip = require('lwip'),
    path = require('path');

function convertImage(pngFile: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    lwip.open(pngFile, function(e: Error, image: any) {
      if (e) {
        reject(e);
        return;
      }

      var jpgFile = pngFile.replace('.png', '.jpg');
      var jpgInfo = { quality: 95 };
      image.writeFile(jpgFile, 'jpg', jpgInfo, function(e: Error) {
        if (e) {
          reject(e);
        }
        else {
          resolve(jpgFile);
        }
      });
    });
  });
}

module.exports = {
  convert: convertImage
};

