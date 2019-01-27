#!/bin/bash
npm version patch
docker build --tag=local-scraper .
version=$(cat package.json|  grep "version" | sed -e 's/"version"://g' | sed -e 's/"//g' | sed -e 's/,//g' | sed -e 's/ //g')
echo "building $version"
docker tag local-scraper:latest "kiote/scraper:$version"
docker push "kiote/scraper:$version"
git push --tags