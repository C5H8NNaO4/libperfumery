declare const scrape: ({ parallel }?: {
    parallel: boolean;
}) => Promise<any[]>;
export declare const store: (files: any, { format, normalize, output, normalized, }?: any) => void;
export { scrape };
