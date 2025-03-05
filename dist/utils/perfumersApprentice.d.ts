import { NormalizedItem } from "@/types/NormalizedItem";
import { ScrapedPAItem } from "@/types/ScrapedItem";
export declare const normalize: ({ amount, ...itm }: ScrapedPAItem, i?: number, arr?: ScrapedPAItem[]) => NormalizedItem;
