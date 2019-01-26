# auto24-ee-scrapper

```
docker pull kiote/scraper:v1.0.1

export SEARCH_URL="https://eng.auto24.ee/kasutatud/nimekiri.php?bn=2&a=100&aj=&b=2&bw=2056&f1=2010&f2=2017&l2=110000&ae=2&af=50&ag=0&ag=1&otsi=search"

docker run -e SEARCH_URL=$SEARCH_URL -it kiote/scraper:v1.0.0 > ./results.csv
```

# run locally

```
export SEARCH_URL=https://eng.auto24.ee/kasutatud/nimekiri.php?bn=2&a=100&aj=&b=2&bw=2056&f1=2010&f2=2017&l2=110000&ae=2&af=50&ag=0&ag=1&otsi=search

node scrape.js
```