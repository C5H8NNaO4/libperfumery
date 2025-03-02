import { chromium } from "playwright";
import path from "path";
import fs, { link } from "fs";
import { normalize } from "../perfumersApprentice.js";

const entryPoint = "https://pellwall.com/collections/ingredients-for-perfumery";

const pageTemplate =
  "https://pellwall.com/collections/ingredients-for-perfumery?page=$page";
const from = 1;
const to = 42;
const output = "src/static/data/scraped/pa";
const normalized = "src/static/data/normalized/pa";

const scrape = async ({ parallel = false, from = 1, to = 3 } = {}) => {
  const browser = await chromium.launch({
    executablePath:
      process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
  });

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
  });

  const links = [...Array(to - from)].map((e, i) =>
    pageTemplate.replace("$page", (i + from).toString())
  );

  console.log("Found ", links.length, " pages. Scraping.");

  const proms = links.map((url) => async () => {
    console.log("Scraping url #", links.indexOf(url), ": ", url);

    const page = await context.newPage();
    console.log("Scraping url #", " New Page, Goto URL");

    await page.goto(url, {
      timeout: 70000,
      waitUntil: "domcontentloaded",
    });
    console.log("Scraping url #", "  Went to URL. Evaluating");

    const elements = await page.$$(
      "li .card__inner .card__content .card__heading a"
    );
    console.log("Scraping url #", "  Get elements. Evaluating");

    const promises = Array.from(elements)
      .map((li) => async () => {
        const href = await li.evaluate(async (li: HTMLAnchorElement) => {
          const baseUrl = "https://pellwall.com/products/";

          const link = li?.href;

          return link;
        });

        const detailPage = await context.newPage();
        await detailPage.goto(href);
        console.log("Going to detail age", href);

        const title = (await (await detailPage.$("h1"))?.innerHTML?.())?.trim();
        const price = (
          await (
            await detailPage.$(".price-item.price-item--regular")
          )?.innerHTML?.()
        )?.trim();
        const size = await (
          await detailPage.$("input[type='radio']:checked")
        )?.inputValue();

        const cas = (
          await Promise.all(
            (Array.from(await detailPage.$$("div div div p")) as any[]).map(
              (ele) => ele.innerHTML()
            )
          )
        )
          .find((p) => p?.match?.(/\d+-\d{2}-\d{1}/g)?.[0])
          ?.match(/\d+-\d{2}-\d{1}/g)?.[0];

        const inputs = Array.from(
          await detailPage.$$(
            ".product-form__input input:not(.quantity__input)"
          )
        );
        const options = [];
        for (const input of inputs) {
          const size = await input.inputValue();
          await input.evaluate((inp: HTMLInputElement) => inp.click());
          await new Promise((resolve) => setTimeout(resolve, 200));

          const price = (
            await (
              await detailPage.$(".price-item.price-item--regular")
            )?.innerHTML?.()
          )?.trim();

          const option = {
            href,
            title,
            price,
            size,
            cas,
            scrapedAt: +new Date(),
          };
          options.push(option);
        }
        console.log("Got link, title, price, sizem cas", options);
        return options;
      })
      .flat();

    let scraped = [];
    if (!parallel) {
      for (const promiseFn of promises) {
        scraped.push(await promiseFn());
      }
    } else {
      scraped.push(...(await Promise.all(promises)));
    }
    console.log("Scraped url #", links.indexOf(url));

    return { url, data: scraped };
  });

  let scraped = [];
  if (parallel) {
    scraped = await Promise.all(proms.map((p) => p()));
  } else {
    for await (const prom of proms) {
      const res = await prom();
      scraped.push(res);
      await new Promise((resolve) => setTimeout(resolve, 4000));
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
