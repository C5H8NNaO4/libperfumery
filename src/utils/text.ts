import lvs from "fast-levenshtein";

export const dist = (query: string, target: string) => {
  return lvs.get(query, target.slice(0, query.length));
};
