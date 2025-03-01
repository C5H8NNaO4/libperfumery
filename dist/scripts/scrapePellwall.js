import { scrape } from "../utils/scrape.js";
const data = await scrape();
console.log("SCRAPED PELLWALL", data);
