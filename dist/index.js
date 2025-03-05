import descriptions from "./src/static/data/generated/descriptions.json" assert { type: "json" };
import odors from "./src/static/data/generated/odors.json" assert { type: "json" };
import normalizedPA from "./static/data/normalized/pa/index.js";
import normalizedPW from "./static/data/normalized/pw/index.js";
export * from "@/utils/search";
export * from "@/utils/perfumersApprentice";
const ingredients = [normalizedPA, normalizedPW].flat();
export { descriptions, odors, ingredients };
