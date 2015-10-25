// da.ts
// DeviantArt API wrappers
//

'use strict';

async function getToken(clientId: string, clientSecret: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    resolve("123");
  });
}

module.exports = {
  token: getToken
};

