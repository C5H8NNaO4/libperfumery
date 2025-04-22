import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { normalize } from "./normalize.js";
const entryPoint = "https://ifrafragrance.org/safe-use/library";
const pageTemplate = entryPoint;
const output = "src/static/data/scraped/ifra";
const normalized = "src/static/data/normalized/ifra";
const scrape = async ({ parallel = false, from = 0, to = 1 } = {}) => {
    const browser = await chromium.launch({
        executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
    });
    const context = await browser.newContext({
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    });
    const links = [...Array(to - from)].map((e, i) => pageTemplate.replace("$page", (i + from).toString()));
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
        const elements = await page.$$("#DataTables_Table_0 tr");
        console.log("Scraping url #", "  Get elements. Evaluating");
        const promises = Array.from(elements)
            .map((tr) => async () => {
            const tds = await tr.evaluate(async (tr) => {
                const tds = Array.from(tr.querySelectorAll("td")).map((td) => td.innerText);
                const baseUrl = "https://ifrafragrance.org/pdf/web/viewer.html?file=/standards/$name.pdf";
                const href = baseUrl.replace("$name", tr.getAttribute("data-id"));
                return [href, ...tds.slice(1)];
            });
            if (!tds || tds.length < 4)
                return tds;
            try {
                const cas = tds[2];
                const name = tds[3];
                const flags = tds[4]?.split("-");
                let date = null;
                try {
                    date = new Date(tds[5]).toISOString();
                }
                catch (e) { }
                const amendment = tds[6];
                return {
                    name,
                    cas,
                    attributes: [
                        ...flags.map((f) => ({ type: "flag", iss: "IFRA", value: f })),
                        {
                            type: "reference",
                            name: "amendment",
                            iss: "IFRA",
                            value: amendment,
                        },
                        { type: "date", iss: "IFRA", name: "addedAt", value: date },
                        {
                            type: "date",
                            iss: "libperfumery",
                            name: "scrapedAt",
                            value: new Date().toISOString(),
                        },
                    ],
                    files: [
                        {
                            contentType: "application/pdf",
                            fileName: tds[0].split("/").pop(),
                            href: tds[0],
                        },
                    ],
                };
            }
            catch (e) {
                console.log("TDS", tds);
                throw e;
            }
            return null;
        })
            .flat();
        // console.log("ITEMS", promises);
        let scraped = [];
        if (!parallel) {
            for (const promiseFn of promises) {
                scraped.push(await promiseFn());
            }
        }
        else {
            scraped.push(...(await Promise.all(promises)));
        }
        console.log("Scraped url #", links.indexOf(url), scraped);
        return { url, data: scraped };
    });
    let scraped = [];
    if (parallel) {
        scraped = await Promise.all(proms.map((p) => p()));
    }
    else {
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
        const name = "ifra.json";
        const cleaned = scraped.flat().filter((itm) => itm?.cas);
        const dirty = scraped.flat().filter((itm) => !itm?.cas);
        console.log("Filtered ", scraped.length - cleaned.length, " Remaining: ", cleaned.length);
        fs.writeFile(pathAbs + "/" + name, JSON.stringify(cleaned), () => {
            console.log("Scraped", name);
        });
        fs.writeFile(pathAbs + "/dirty." + name, JSON.stringify(dirty), () => {
            console.log("Scraped", name);
        });
        fs.writeFile(pathNorm + "/" + name, JSON.stringify(cleaned.map(normalize).flat()), () => {
            console.log("Normalized", name);
        });
    });
};
export { scrape };
