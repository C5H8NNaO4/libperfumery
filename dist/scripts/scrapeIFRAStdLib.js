import { scrape } from "../utils/ifra/scrape.js";
import { store } from "../utils/ifra/scrape.js";
const run = async () => {
    const data = await scrape();
    console.log("Scraped IFRA ", data);
    await store(data);
    console.log("Stored IFRA "), data;
};
run();
