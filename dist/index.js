import descriptions from "./static/data/generated/descriptions.json" assert { type: "json" };
import odors from "./static/data/generated/odors.json" assert { type: "json" };
import normalizedPA from "./static/data/normalized/pa/index.js";
import normalizedPW from "./static/data/normalized/pw/index.js";
import normalizedIFRAStdLib from "./static/data/normalized/ifra/index.js";
export * from "./utils/search.js";
export * from "./utils/perfumersApprentice.js";
export * from "./utils/ifra/util.js";
export * from "./static/data/normalized/ifra/index.js";
const ingredients = [normalizedPA, normalizedPW].flat();
const stores = {
    PellWall: normalizedPW,
    PerfumersApprentice: normalizedPA,
};
const ifra = {
    stdlib: normalizedIFRAStdLib,
};
export { descriptions, odors, ingredients, stores, ifra };
