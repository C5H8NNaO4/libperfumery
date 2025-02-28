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
const scrape = async ({ parallel } = { parallel: false }) => {
    const browser = await chromium.launch({
        executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
    });
    const proms = urls.map((url) => async () => {
        console.log("Scraping url #", urls.indexOf(url), ": ", url);
        const page = await browser.newPage();
        console.log("Scraping url #", " New Page, Goto URL");
        await page.goto(url);
        console.log("Scraping url #", "  Went to URL. Evaluating");
        const elements = await page.$$(".product-listing li");
        console.log("Scraping url #", "  Get elements. Evaluating");
        const scraped = await Promise.all([...elements]
            .map(async (li) => {
            return await li.evaluate((li) => {
                const baseUrl = "https://shop.perfumersapprentice.com";
                const link = li.querySelector("a")?.href;
                const title = li.querySelector("h2")?.innerText;
                const cas = Array.from(li.querySelectorAll("p"))
                    .find((p) => p.innerText?.match(/\d+-\d{2}-\d{1}/g)?.[0])
                    ?.innerText?.match(/\d+-\d{2}-\d{1}/g)?.[0];
                const options = Array.from(li.querySelectorAll("select option")).map((option) => {
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
            .flat());
        console.log("Scraped url #", urls.indexOf(url));
        return { url, data: scraped };
    });
    let scraped = [];
    if (parallel) {
        scraped = await Promise.all(proms.map((p) => p()));
    }
    else {
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
        console.log("Filtered ", scraped.length - cleaned.length, " Remaining: ", cleaned.length);
        fs.writeFile(pathAbs + "/" + name, JSON.stringify(cleaned), () => {
            console.log("Scraped", name);
        });
        fs.writeFile(pathNorm + "/" + name, JSON.stringify(cleaned.map(normalize)), () => {
            console.log("Normalized", name);
        });
    });
};
export { scrape };
