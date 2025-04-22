import { normalize } from "@/utils/ifra/normalize";
import { scrape } from "@/utils/ifra/scrape";
import { store } from "@/utils/ifra/scrape";

const run = async () => {
  const data = await scrape();
  console.log("Scraped IFRA ", data);

  await store(data);

  console.log("Stored IFRA "), data;
};

run();
