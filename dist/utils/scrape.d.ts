declare const scrape: ({ parallel }?: {
    parallel: boolean;
}) => Promise<any[]>;
export declare const store: (files: any) => void;
export { scrape };
