#!/bin/sh

mkdir -p ../bin/downloader
cp package.json ../bin/downloader/package.json

tsc --experimentalAsyncFunctions -t ES6 --noImplicitAny \
  --outdir ../bin/downloader \
  *.ts

