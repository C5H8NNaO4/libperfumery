import { chromium } from "playwright";
import path from "path";
import fs, { link } from "fs";
import { normalize } from "../perfumersApprentice.js";

const entryPoint = "https://pellwall.com/collections/ingredients-for-perfumery";

const urlsSelector = ".pagination__list list-unstyled li a";
const hrefProp = "href";

const output = "src/static/data/scraped/pa";
const normalized = "src/static/data/normalized/pa";

const scrape = async ({ parallel } = { parallel: false }) => {
  const browser = await chromium.launch({
    executablePath:
      process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
  });

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();
  await page.goto(entryPoint);

  console.log("Scraping url #", entryPoint, ". Getting pages");
  const pages = await page.$$(urlsSelector);
  const links = await Promise.all(
    Array.from(pages).map((ele) =>
      ele.evaluate((ele: HTMLAnchorElement) => ele.href)
    )
  );

  console.log("Found ", links.length, " urls");

  const proms = [entryPoint, ...links].map((url) => async () => {
    console.log("Scraping url #", links.indexOf(url), ": ", url);

    const page = await context.newPage();
    console.log("Scraping url #", " New Page, Goto URL");

    await page.goto(url);
    console.log("Scraping url #", "  Went to URL. Evaluating");

    const elements = await page.$$("li .card__content a");
    console.log("Scraping url #", "  Get elements. Evaluating");

    const scraped = await Promise.all(
      Array.from(elements)
        .map(async (li) => {
          return await li.evaluate(async (li) => {
            const baseUrl = "https://pellwall.com/products/";

            const link = li.querySelector("a")?.href;
            const title = li.querySelector("h2")?.innerText;

            const detailPage = await context.newPage();
            await detailPage.goto(link);

            console.log("Scraping url #", " New Page, Goto URL");

            const price = li.querySelector(
              ".price-item.price-item--regular"
            )?.innerHTML;
            const size = li.querySelector("radio:checked")?.innerHTML;

            const cas = (Array.from(li.querySelectorAll("p")) as any[])
              .find((p) => p.innerText?.match(/\d+-\d{2}-\d{1}/g)?.[0])
              ?.innerText?.match(/\d+-\d{2}-\d{1}/g)?.[0];

            const options = Array.from(
              li.querySelectorAll(".product-form__input input[type='radio']")
            ).map((option: any) => {
              const text = option.innerText;
              console.log("SCRAPING OPTION!!!");
              //   const [, amount] = /(\d+(?:g|kg|ml))/.exec(text) || [];
              //   const [, price] = /\$(\d+)/.exec(text) || [];
              return {
                title,
                amount: text,
                price: price + "$",
                cas,
                scrapedAt: +new Date(),
                baseUrl,
                link: link.replace(baseUrl, ""),
              };
            });

            return options;
          });
        })
        .flat()
    );
    console.log("Scraped url #", links.indexOf(url));

    return { url, data: scraped };
  });

  let scraped = [];
  if (parallel) {
    scraped = await Promise.all(proms.map((p) => p()));
  } else {
    for await (const prom of proms) {
      scraped.push(await prom());
    }
  }

  await browser.close();
  return scraped;
};

export const store = (files) => {
  files.forEach(({ data: scraped, url }) => {
    const pathAbs = path.resolve(output);
    const pathNorm = path.resolve(normalized);
    const name = url.slice(-3).replace("-", "") + ".json";
    const cleaned = scraped
      .flat()
      .filter((itm) => itm?.title && itm?.amount && itm?.price);
    console.log(
      "Filtered ",
      scraped.length - cleaned.length,
      " Remaining: ",
      cleaned.length
    );
    fs.writeFile(pathAbs + "/" + name, JSON.stringify(cleaned), () => {
      console.log("Scraped", name);
    });
    fs.writeFile(
      pathNorm + "/" + name,
      JSON.stringify(cleaned.map(normalize as any)),
      () => {
        console.log("Normalized", name);
      }
    );
  });
};

export { scrape };
