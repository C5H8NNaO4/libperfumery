import { NormalizedItem } from "@/types/NormalizedItem";
import { dist } from "./text";
import { PerfumeryItemQuery } from "@/types/Query";

export const findIngredients = (
  query: PerfumeryItemQuery,
  items: NormalizedItem[],
  distance = 1
) => {
  const filtered = items.filter((item) => {
    const dTitle = item.title?.split(" ").reduce((dMin, word) => {
      return Math.min(dMin, dist(query.title || "", word));
    }, Infinity);
    const dCAS = new RegExp(query?.cas || "").exec(item.cas)?.[0]
      ? 0
      : Infinity;
    const dAmount =
      new RegExp(query?.amount || "").exec(item.amount || "")?.[0] ||
      "" === item.amount ||
      ""
        ? 0
        : Infinity;
    const dDesc = item.description?.split(" ").reduce((dMin, word) => {
      return Math.min(
        dMin,
        dist(new RegExp(query.description || "").exec(word)?.[0] || "", word)
      );
    }, Infinity);

    return [
      !query.cas ? null : dCAS,
      query.title ? dTitle : null,
      query.description ? dDesc : null,
      query.amount ? dAmount : null,
    ]
      .filter((d) => d !== null)
      .every((dist) => dist <= distance);
  });

  const sorted = filtered.sort((a, b) => {
    const prop = query.cas
      ? "cas"
      : query.description
      ? "description"
      : query.amount
      ? "amount"
      : "title";

    const aDist = dist(query[prop] || "", a[prop] || "");
    const bDist = dist(query[prop] || "", b[prop] || "");

    return bDist - aDist;
  });

  return sorted;
};

export const findIngredient = (
  query: PerfumeryItemQuery,
  items: NormalizedItem[]
) => {
  return findIngredients(query, items).at(0);
};
