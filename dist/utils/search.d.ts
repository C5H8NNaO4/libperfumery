import { NormalizedItem } from "@/types/NormalizedItem";
import { PerfumeryItemQuery } from "@/types/Query";
export declare const findIngredients: (query: PerfumeryItemQuery, items: NormalizedItem[], distance?: number) => NormalizedItem[];
export declare const findIngredient: (query: PerfumeryItemQuery, items: NormalizedItem[]) => NormalizedItem;
