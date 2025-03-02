declare const scrape: ({ parallel, from, to }?: {
    parallel?: boolean;
    from?: number;
    to?: number;
}) => Promise<any[]>;
export declare const store: (files: any) => void;
export { scrape };
