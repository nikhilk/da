// data.d.ts
// Data declarations
//

declare module data {

  interface Options {
    path: string;
  }

  interface ImageMetadata {
    url: string;
    source: string;
    description: string;
    artist: string;
    datetime: Date;
  }
}

