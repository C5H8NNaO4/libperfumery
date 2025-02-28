import descriptions from "./static/data/generated/descriptions.json" assert { type: "json" };
import odors from "./static/data/generated/odors.json" assert { type: "json" };
import normalized from "./static/data/normalized/pa/index.js";
export * from "./utils/search.js";
export * from "./utils/scrape.js";
const ingredients = normalized.map((ing) => {
    return {
        ...ing,
        odors: odors[ing.title],
        description: descriptions[ing.title],
    };
});
export { descriptions, odors, ingredients };
