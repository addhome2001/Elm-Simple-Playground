#!/bin/bash

set -e

npm run build

echo "Build successful"

git checkout gh-pages
mv ./dist/* .
git add *.js *.css index.html

git commit -m "rebuild demo"
git push origin gh-pages

git checkout master
