// data.d.ts
// Data declarations
//

declare module data {

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

