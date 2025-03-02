import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { normalize as normalizePA } from "./perfumersApprentice.js";

const urls = [
  "https://shop.perfumersapprentice.com/c-244-all-fragrance-ingredients.aspx?pagerange=0-B",
  "https://shop.perfumersapprentice.com/c-244-all-fragrance-ingredients.aspx?pagerange=C-D",
  "https://shop.perfumersapprentice.com/c-244-all-fragrance-ingredients.aspx?pagerange=E-G",
  "https://shop.perfumersapprentice.com/c-244-all-fragrance-ingredients.aspx?pagerange=H-K",
  "https://shop.perfumersapprentice.com/c-244-all-fragrance-ingredients.aspx?pagerange=L-N",
  "https://shop.perfumersapprentice.com/c-244-all-fragrance-ingredients.aspx?pagerange=O-R",
  "https://shop.perfumersapprentice.com/c-244-all-fragrance-ingredients.aspx?pagerange=S-Z",
];

const defOutputPath = "src/static/data/scraped/pa";
const defNormalizedPath = "src/static/data/normalized/pa";

const scrape = async ({ parallel } = { parallel: false }) => {
  const browser = await chromium.launch({
    executablePath:
      process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
  });

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
  });

  const proms = urls.map((url) => async () => {
    console.log("Scraping url #", urls.indexOf(url), ": ", url);

    const page = await context.newPage();
    console.log("Scraping url #", " New Page, Goto URL");

    await page.goto(url);
    console.log("Scraping url #", "  Went to URL. Evaluating");

    const elements = await page.$$(".product-listing li");
    console.log("Scraping url #", "  Get elements. Evaluating");

    const scraped = await Promise.all(
      [...elements]
        .map(async (li) => {
          return await li.evaluate((li) => {
            const baseUrl = "https://shop.perfumersapprentice.com";
            const href = li.querySelector("a")?.href;
            const title = li.querySelector("h2")?.innerText;

            const cas = (Array.from(li.querySelectorAll("p")) as any[])
              .find((p) => p.innerText?.match(/\d+-\d{2}-\d{1}/g)?.[0])
              ?.innerText?.match(/\d+-\d{2}-\d{1}/g)?.[0];
            const options = Array.from(
              li.querySelectorAll("select option")
            ).map((option: any) => {
              const text = option.innerText;
              const [, size] = /(\d+(?:g|kg|ml))/.exec(text) || [];
              const [, price] = /\$(\d+)/.exec(text) || [];
              return {
                title,
                size,
                price: price + "$",
                cas,
                scrapedAt: +new Date(),
                href,
              };
            });

            return options;
          });
        })
        .flat()
    );
    console.log("Scraped url #", urls.indexOf(url));

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

export const store = (
  files,
  {
    format = (url) => url.slice(-3) + ".json",
    normalize = normalizePA,
    output = defOutputPath,
    normalized = defNormalizedPath,
  }: any = {}
) => {
  files.forEach(({ data: scraped, url }) => {
    const pathAbs = path.resolve(output);
    const pathNorm = path.resolve(normalized);
    const name = format(url);
    const cleaned = scraped
      .flat()
      .filter((itm) => itm?.title && itm?.size && itm?.price);
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
