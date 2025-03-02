import descriptions from "@/static/data/generated/descriptions.json" assert { type: "json" };
import odors from "@/static/data/generated/odors.json" assert { type: "json" };
import normalizedPA from "./static/data/normalized/pa";
import normalizedPW from "./static/data/normalized/pw";
export * from "@/utils/search";
export * from "@/utils/scrape";
export * from "@/utils/perfumersApprentice";

const ingredients = [normalizedPA, normalizedPW].flat();

export { descriptions, odors, ingredients };
