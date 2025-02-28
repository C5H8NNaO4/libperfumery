import { scrape, store } from "../utils/scrape.js";
const data = await scrape();
await store(data);
