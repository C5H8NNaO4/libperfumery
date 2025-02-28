import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { normalize } from "./perfumersApprentice.js";

const urls = [
  "https://shop.perfumersapprentice.com/c-244-all-fragrance-ingredients.aspx?pagerange=0-B",
  "https://shop.perfumersapprentice.com/c-244-all-fragrance-ingredients.aspx?pagerange=C-D",
  "https://shop.perfumersapprentice.com/c-244-all-fragrance-ingredients.aspx?pagerange=E-G",
  "https://shop.perfumersapprentice.com/c-244-all-fragrance-ingredients.aspx?pagerange=H-K",
  "https://shop.perfumersapprentice.com/c-244-all-fragrance-ingredients.aspx?pagerange=L-N",
  "https://shop.perfumersapprentice.com/c-244-all-fragrance-ingredients.aspx?pagerange=O-R",
  "https://shop.perfumersapprentice.com/c-244-all-fragrance-ingredients.aspx?pagerange=S-Z",
];

const output = "src/static/data/scraped/pa";
const normalized = "src/static/data/normalized/pa";

const scrape = async () => {
  const browser = await chromium.launch({
    executablePath:
      process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
  });

  const proms = urls.map(async (url) => {
    console.log("Scraping url #", urls.indexOf(url), ": ", url);
    const page = await browser.newPage();

    await page.goto(url);
    const elements = await page.$$(".product-listing li");

    const scraped = await Promise.all(
      [...elements]
        .map(async (li) => {
          return await li.evaluate((li) => {
            const baseUrl = "https://shop.perfumersapprentice.com";
            const link = li.querySelector("a")?.href;
            const title = li.querySelector("h2")?.innerText;

            const cas = (Array.from(li.querySelectorAll("p")) as any[])
              .find((p) => p.innerText?.match(/\d+-\d{2}-\d{1}/g)?.[0])
              ?.innerText?.match(/\d+-\d{2}-\d{1}/g)?.[0];
            const options = Array.from(
              li.querySelectorAll("select option")
            ).map((option: any) => {
              const text = option.innerText;
              const [, amount] = /(\d+(?:g|kg|ml))/.exec(text) || [];
              const [, price] = /\$(\d+)/.exec(text) || [];
              return {
                title,
                amount,
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

    return { url, data: scraped };
  });
  const scraped = await Promise.all(proms);
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
