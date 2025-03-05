import { normalize } from "../utils/pellwall/normalize.js";
import { scrape } from "../utils/pellwall/scrape.js";
import { store } from "../utils/scrape.js";
const batch = async (i) => {
    const data = await scrape({
        parallel: false,
        from: 1 + 7 * i,
        to: (7 * (i + 1)) + 1,
    });
    await store(data, {
        format: (url) => "page" + url.match(/\d+$/g)?.at(0) + ".json",
        normalize,
        output: "src/static/data/scraped/pw",
        normalized: "src/static/data/normalized/pw",
    });
};
const run = async (i) => {
    await batch(i);
    console.log("Scraped batch ", i, ". Waiting 10s");
    await new Promise((r) => setTimeout(r, 10000));
    if (i < 7)
        setTimeout(run, 0, i + 1);
};
// await run(0);
const data = await scrape({
    parallel: false,
    from: 42,
    to: 43,
});
await store(data, {
    format: (url) => "page" + url.match(/\d+$/g)?.at(0) + ".json",
    normalize,
    output: "src/static/data/scraped/pw",
    normalized: "src/static/data/normalized/pw",
});
console.log("SCRAPED PELLWALL");
