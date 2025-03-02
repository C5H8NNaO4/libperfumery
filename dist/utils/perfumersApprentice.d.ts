import { NormalizedItem } from "../types/NormalizedItem.js";
import { ScrapedPAItem } from "../types/ScrapedItem.js";
export declare const normalize: ({ amount, ...itm }: ScrapedPAItem, i?: number, arr?: ScrapedPAItem[]) => NormalizedItem;
