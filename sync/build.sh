#!/bin/sh

mkdir -p ../bin/sync
cp package.json ../bin/sync/package.json

tsc --experimentalAsyncFunctions -t ES6 --noImplicitAny \
  --outdir ../bin/sync \
  *.ts

