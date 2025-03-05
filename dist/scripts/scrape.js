import { scrape, store } from "@/utils/scrape";
const data = await scrape();
await store(data);
