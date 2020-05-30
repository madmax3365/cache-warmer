import pkg from 'puppeteer';


const crawl = async (origin) => {
  console.log(origin)
  const browser = await pkg.launch();
  const page = await browser.newPage();
  await page.goto(`${origin}/sitemap.xml`);
  const sitemap = await page.content();
  const urls = sitemap.matchAll(/<loc>(https:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)<\/loc>/g);
    for (const url of urls) {
      const u = url[1];
      await page.goto(u);
      await page.content();
    }
  await browser.close();
}

export default crawl