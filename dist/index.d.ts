import descriptions from "./static/data/generated/descriptions.json";
import odors from "./static/data/generated/odors.json";
export * from "./utils/search.js";
export * from "./utils/perfumersApprentice.js";
export * from "./utils/ifra/util.js";
export * from "./static/data/normalized/ifra/index.js";
declare const ingredients: ({
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
} | import("./types/NormalizedItem.js").NormalizedItem)[];
declare const stores: {
    PellWall: import("./types/NormalizedItem.js").NormalizedItem[];
    PerfumersApprentice: ({
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
};
declare const ifra: {
    stdlib: import("./types/NormalizedItem.js").NormalizedIFRAEntry[];
};
export { descriptions, odors, ingredients, stores, ifra };
