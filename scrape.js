const puppeteer = require('puppeteer');
const striptags = require('striptags');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.CHROME_BIN || null,
    args: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage();
  const url = process.env.SEARCH_URL;
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
    const imgRegex = /img src="(.*jpg)/;
    const imgFound = title[0].match(imgRegex);

    const linkRegex = /a href="\/used\/([0-9]+)"/;
    const linkFound = title[0].match(linkRegex);
    if (imgFound && linkFound) {
      title[0] = `${imgFound[1]}\t${linkFound[1]}`;
      const result = title.join("\t");
      console.log(striptags(result));
    }
  });
  await browser.close();
})();
