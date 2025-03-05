import { normalize } from "@/utils/pellwall/normalize";
import { scrape } from "@/utils/pellwall/scrape";
import { store } from "@/utils/scrape";

const batch = async (i: number) => {
  const data = await scrape({
    parallel: false,
    from: 1 + 7 * i,
    to: (7 * (i + 1)) + 1,
  });
  await store(data, {
    format: (url: string) => "page" + url.match(/\d+$/g)?.at(0) + ".json",
    normalize,
    output: "src/static/data/scraped/pw",
    normalized: "src/static/data/normalized/pw",
  });
};

const run = async (i: number) => {
  await batch(i);
  console.log("Scraped batch ", i, ". Waiting 10s");

  await new Promise((r) => setTimeout(r, 10000));
  if (i < 7) setTimeout(run, 0, i + 1);
};

// await run(0);

const data = await scrape({
  parallel: false,
  from: 35,
  to: 35 + 1,
});
await store(data, {
  format: (url: string) => "page" + url.match(/\d+$/g)?.at(0) + ".json",
  normalize,
  output: "src/static/data/scraped/pw",
  normalized: "src/static/data/normalized/pw",
});

console.log("SCRAPED PELLWALL");
