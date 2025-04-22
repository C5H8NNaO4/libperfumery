import descriptions from "@/static/data/generated/descriptions.json" assert { type: "json" };
import odors from "@/static/data/generated/odors.json" assert { type: "json" };
import normalizedPA from "./static/data/normalized/pa";
import normalizedPW from "./static/data/normalized/pw";
import normalizedIFRAStdLib from "./static/data/normalized/ifra";
export * from "@/utils/search";
export * from "@/utils/perfumersApprentice";
export * from "@/utils/ifra/util";

const ingredients = [normalizedPA, normalizedPW].flat();

const stores = {
  PellWall: normalizedPW,
  PerfumersApprentice: normalizedPA,
};

const ifra = {
  stdlib: normalizedIFRAStdLib,
};

export { descriptions, odors, ingredients, stores, ifra };
