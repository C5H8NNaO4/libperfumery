import descriptions from "@/static/data/generated/descriptions.json" assert { type: "json" };
import odors from "@/static/data/generated/odors.json" assert { type: "json" };
import normalized from "./static/data/normalized/pa";
export * from "@/utils/search";
export * from "@/utils/scrape";

const ingredients = normalized.map((ing) => {
  return {
    ...ing,
    odors: odors[ing.title],
    description: descriptions[ing.title],
  };
});

export { descriptions, odors, ingredients };
