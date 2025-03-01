import { scrape, store } from "@/utils/scrape";

const data = await scrape();
console.log("SCRAPED PELLWALL", data);
