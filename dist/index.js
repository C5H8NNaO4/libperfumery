import descriptions from "./static/data/generated/descriptions.json" assert { type: "json" };
import odors from "./static/data/generated/odors.json" assert { type: "json" };
import normalizedPA from "./static/data/normalized/pa/index.js";
import normalizedPW from "./static/data/normalized/pw/index.js";
export * from "./utils/search.js";
export * from "./utils/scrape.js";
export * from "./utils/perfumersApprentice.js";
const ingredients = [normalizedPA, normalizedPW].flat();
export { descriptions, odors, ingredients };
