#!/bin/sh

mkdir -p ../bin
cp package.json ../bin/package.json

tsc --experimentalAsyncFunctions -t ES6 --noImplicitAny --outdir ../bin *.ts

