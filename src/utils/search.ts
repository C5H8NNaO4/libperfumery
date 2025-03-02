import { NormalizedItem } from "@/types/NormalizedItem";
import { dist } from "./text";
import { PerfumeryItemQuery } from "@/types/Query";

export const findIngredients = (
  query: PerfumeryItemQuery,
  items: NormalizedItem[],
  distance = 1
) => {
  const filtered = items.filter((item) => {
    if (query.cas && !item.cas && query.cas !== "null") return false;
    const dTitle = item.title?.split(" ").reduce((dMin, word) => {
      return Math.min(dMin, dist(query.title || "", word));
    }, Infinity);
    const dCAS = new RegExp(query?.cas || "").exec(
      !item.cas ? "" : item.cas
    )?.[0]
      ? 0
      : Infinity;
    const dAmount =
      new RegExp(query?.size || "").exec(item.size || "")?.[0] ||
      "" === item.size ||
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
      query.size ? dAmount : null,
    ]
      .filter((d) => d !== null)
      .every((dist) => dist <= distance);
  });

  const sorted = filtered.sort((a, b) => {
    const prop = query.cas
      ? "cas"
      : query.description
      ? "description"
      : query.size
      ? "size"
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
