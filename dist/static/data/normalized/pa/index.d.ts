declare const normalized: ({
    title: string;
    price: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    size: string;
    dilution: string;
    tags: string[];
    attributes: any[];
    aliases: string[];
    source: string;
    odors: any;
    description: any;
    cas?: undefined;
} | {
    title: string;
    price: string;
    cas: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    size: string;
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
    odors: any;
    description: any;
} | {
    title: string;
    price: string;
    cas: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    size: string;
    dilution: string;
    tags: string[];
    attributes: any[];
    aliases: string[];
    source: string;
    odors: any;
    description: any;
} | {
    title: string;
    price: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    size: string;
    dilution: string;
    tags: any[];
    attributes: {
        manufacturer: string;
    }[];
    aliases: any[];
    source: string;
    odors: any;
    description: any;
    cas?: undefined;
} | {
    title: string;
    price: string;
    cas: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    size: string;
    dilution: string;
    tags: any[];
    attributes: any[];
    aliases: any[];
    source: string;
    odors: string[];
    description: string;
} | {
    title: string;
    price: string;
    cas: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    size: string;
    dilution: string;
    tags: any[];
    attributes: {
        manufacturer: string;
    }[];
    aliases: any[];
    source: string;
    odors: any;
    description: any;
} | {
    title: string;
    price: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    size: string;
    dilution: string;
    tags: any[];
    attributes: {
        dilutant: string;
    }[];
    aliases: any[];
    source: string;
    odors: any;
    description: any;
    cas?: undefined;
} | {
    title: string;
    price: string;
    cas: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    size: string;
    dilution: string;
    tags: any[];
    attributes: {
        dilutant: string;
    }[];
    aliases: any[];
    source: string;
    odors: any;
    description: any;
} | {
    title: string;
    price: string;
    cas: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    size: string;
    dilution: string;
    tags: any[];
    attributes: {
        origin: string;
    }[];
    aliases: any[];
    source: string;
    odors: any;
    description: any;
} | {
    title: string;
    price: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    size: string;
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
    odors: any;
    description: any;
    cas?: undefined;
} | {
    title: string;
    price: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    size: string;
    dilution: string;
    tags: any[];
    attributes: {
        origin: string;
    }[];
    aliases: any[];
    source: string;
    odors: any;
    description: any;
    cas?: undefined;
} | {
    title: string;
    price: string;
    scrapedAt: number;
    baseUrl: string;
    link: string;
    size: string;
    dilution: string;
    tags: any[];
    attributes: any[];
    aliases: any[];
    source: string;
    odors: string[];
    description: string;
    cas?: undefined;
})[];
export default normalized;
