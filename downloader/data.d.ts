// data.d.ts
// Data declarations
//

declare module data {

  interface Options {
    client: string;
    secret: string;
    user: string;
    source: string;
    target: string;
    artists: boolean;
  }

  interface Collection {
    name: string;
    id: string;
  }

  interface Deviation {
    id: string;
    url: string;
    title: string;
    artist: string;
    src: string;
    time: number;
  }
}

