import descriptions from "./static/data/generated/descriptions.json";
import odors from "./static/data/generated/odors.json";
export * from "./utils/search.js";
export * from "./utils/scrape.js";
declare const ingredients: ({
    odors: any;
    description: any;
    title: string;
    amount: string;
    price: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    dilution: string;
    tags: string[];
    attributes: any[];
    aliases: string[];
    source: string;
    cas?: undefined;
} | {
    odors: any;
    description: any;
    title: string;
    amount: string;
    price: string;
    cas: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    dilution: string;
    tags: any[];
    attributes: ({
        manufacturer: string;
        dilutant?: undefined;
    } | {
        dilutant: string;
        manufacturer?: undefined;
    })[];
    aliases: any[];
    source: string;
} | {
    odors: any;
    description: any;
    title: string;
    amount: string;
    price: string;
    cas: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    dilution: string;
    tags: string[];
    attributes: any[];
    aliases: string[];
    source: string;
} | {
    odors: any;
    description: any;
    title: string;
    amount: string;
    price: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    dilution: string;
    tags: any[];
    attributes: {
        manufacturer: string;
    }[];
    aliases: any[];
    source: string;
    cas?: undefined;
} | {
    odors: any;
    description: any;
    title: string;
    amount: string;
    price: string;
    cas: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    dilution: string;
    tags: any[];
    attributes: {
        manufacturer: string;
    }[];
    aliases: any[];
    source: string;
} | {
    odors: any;
    description: any;
    title: string;
    amount: string;
    price: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    dilution: string;
    tags: any[];
    attributes: {
        dilutant: string;
    }[];
    aliases: any[];
    source: string;
    cas?: undefined;
} | {
    odors: any;
    description: any;
    title: string;
    amount: string;
    price: string;
    cas: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    dilution: string;
    tags: any[];
    attributes: {
        dilutant: string;
    }[];
    aliases: any[];
    source: string;
} | {
    odors: any;
    description: any;
    title: string;
    amount: string;
    price: string;
    cas: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    dilution: string;
    tags: any[];
    attributes: {
        origin: string;
    }[];
    aliases: any[];
    source: string;
} | {
    odors: any;
    description: any;
    title: string;
    amount: string;
    price: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    dilution: string;
    tags: string[];
    attributes: ({
        manufacturer: string;
        origin?: undefined;
    } | {
        origin: string;
        manufacturer?: undefined;
    })[];
    aliases: any[];
    source: string;
    cas?: undefined;
} | {
    odors: any;
    description: any;
    title: string;
    amount: string;
    price: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    dilution: string;
    tags: any[];
    attributes: {
        origin: string;
    }[];
    aliases: any[];
    source: string;
    cas?: undefined;
})[];
export { descriptions, odors, ingredients };
