import { Sources } from "./Sources.js";
export type NormalizedItem = {
    title: string;
    price: string;
    source: Sources;
    size: string;
    dilution: string;
    cas?: string;
    href?: string;
    tags: string[];
    aliases: string[];
    odors?: string[];
    description?: string;
};
