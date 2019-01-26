const puppeteer = require('puppeteer');
const striptags = require('striptags');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.CHROME_BIN || null,
    args: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage();
  const url = "https://eng.auto24.ee/kasutatud/nimekiri.php?bn=2&a=100&aj=&b=2&bw=2056&f1=2010&f2=2017&l2=110000&ae=2&af=50&ag=0&ag=1&otsi=search";
  await page.goto(url);
  const allTitles = await page.evaluate(()=>
    Array.from(document.querySelectorAll('tr.result-row')).map((el)=>{
      const elements = Array.from(el.childNodes);
      const picture = elements[0].innerHTML;
      const descr= elements[1].innerHTML; 
      const year = elements[4].innerHTML; 
      const fuel = elements[6].innerHTML;
      const transmission = elements[8].innerHTML;
      const price = elements[10].innerHTML;
      return [picture, year, descr, fuel, transmission, price]})
  );
  allTitles.map((title) => {
    const regex = /img src="(.*jpg)/;
    const found = title[0].match(regex);
    title[0] = found[1];
    const result = title.join("\t");
    console.log(striptags(result));
  });
  await browser.close();
})();
