#!/usr/bin/env bash

if ! git diff-files --quiet; then
    yarn run build
fi;

npx http-server -p 3000 -c-1