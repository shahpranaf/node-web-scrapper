const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const scrollPageToBottom = require("puppeteer-autoscroll-down");

const url = "https://www.cricbuzz.com/cricket-news/latest-news";

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });

    await page.goto(url);
    page.setRequestInterception;
    const lastPosition = await scrollPageToBottom(page);
    const html = await page.content();

    console.log(`lastPosition: ${lastPosition}`);

    // console.log(html);
    const $ = cheerio.load(html);
    const newsHeadlines = [];
    $("#news-list")
        .find(".cb-nws-hdln-ancr")
        .each(function() {
            newsHeadlines.push({
                title: $(this).text()
            });
        });

    console.log(newsHeadlines);

    await browser.close();
})();
