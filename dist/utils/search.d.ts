import { NormalizedItem } from "../types/NormalizedItem.js";
import { PerfumeryItemQuery } from "../types/Query.js";
export declare const findIngredients: (query: PerfumeryItemQuery, items: NormalizedItem[], distance?: number) => NormalizedItem[];
export declare const findIngredient: (query: PerfumeryItemQuery, items: NormalizedItem[]) => NormalizedItem;
