declare const scrape: () => Promise<{
    url: string;
    data: {
        title: string;
        amount: string;
        price: string;
        cas: any;
        scrapedAt: number;
        baseUrl: string;
        link: string;
    }[][];
}[]>;
export declare const store: (files: any) => void;
export { scrape };
