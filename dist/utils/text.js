import lvs from "fast-levenshtein";
export const dist = (query, target) => {
    return lvs.get(query, target.slice(0, query.length));
};
