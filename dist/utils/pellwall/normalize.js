import { Sources } from "../../types/Sources.js";
import clsx from "clsx";
import { descriptions, odors } from "../../index.js";
import { attributes, manufacturers, origins, } from "../../static/definitions/ingredients.js";
export const normalize = (itm, i, arr) => {
    const title = itm?.title
        .replace(/\s\*\*/g, "")
        .replace(/\s\(Natural\)/, "")
        .replace(/\s*$/, "")
        .trim();
    const norm = {
        ...itm,
        dilution: /\d+%/.exec(itm?.title)?.[0] || "100%",
        title: title.trim(),
        tags: clsx({
            Absolute: /Absolute/.test(itm?.title),
            Flammable: /\(\s\*\*\)/.test(itm?.title),
            Fragrance: /Fragrance/.test(itm?.title),
        })
            .split(" ")
            .filter(Boolean),
        attributes: [],
        aliases: [],
        source: Sources.PerfumersApprentice,
        odors: odors[itm.title] || null,
        description: descriptions[itm.title] || null,
        href: itm.href,
    };
    attributes.forEach((tag) => {
        const attrReg = new RegExp(`\\s?-?\\s\\(?${tag}\\)?`, "i");
        if (attrReg.test(norm.title)) {
            norm.tags.push(tag);
            norm.title = norm.title.replace(attrReg, "").trim();
        }
    });
    manufacturers.forEach((tag) => {
        const attrReg = new RegExp(`\\s?-?\\s\\(?${tag}\\)?`);
        if (attrReg.test(norm.title)) {
            norm.attributes.push({ manufacturer: tag });
            norm.title = norm.title.replace(attrReg, "").trim();
        }
    });
    const dilutant = /\(?\s?-?\s?\d+% \(?(.+[^)])\)?$/g.exec(norm?.title)?.[1];
    if (dilutant) {
        norm.attributes.push({ dilutant: dilutant.replace("in ", "") });
        norm.title = norm.title.replace(/\(?\s?-?\s?\d+% (.+[^)])\)?$/, "").trim();
    }
    else {
        norm.title = norm.title.replace(/\s?\d+%/, "");
    }
    const parens = /\((.+?)\)/g.exec(norm?.title)?.[1];
    if (parens) {
        if (attributes.includes(parens)) {
            norm.tags.push(parens);
            norm.title = norm.title.replace(/\((.+?)\)/g, "").trim();
        }
        if (origins.includes(parens)) {
            norm.attributes.push({ origin: parens });
            norm.title = norm.title.replace(/\((.+?)\)/g, "").trim();
        }
        if (manufacturers.includes(parens)) {
            norm.attributes.push({ manufacturer: parens });
            norm.title = norm.title.replace(/\((.+?)\)/g, "").trim();
        }
    }
    const hyphens = norm?.title?.split(/\s+-\s+/);
    hyphens.slice(1).forEach((part) => {
        if (attributes.includes(part)) {
            norm.tags.push(part);
            norm.title = norm.title.replace(" - " + part, "").trim();
        }
        else if (origins.includes(part)) {
            norm.attributes.push({ origin: part });
            norm.title = norm.title.replace(" - " + part, "").trim();
        }
        else {
            norm.aliases.push(part);
            norm.title = norm.title.replace(" - " + part, "").trim();
        }
    });
    const commas = norm?.title?.split(/, /);
    commas.slice(1).forEach((part) => {
        if (attributes.includes(part)) {
            norm.tags.push(part);
            norm.title = norm.title.replace(", " + part, "").trim();
        }
        else if (origins.includes(part)) {
            norm.attributes.push({ origin: part });
            norm.title = norm.title.replace(", " + part, "").trim();
        }
        else {
            norm.tags.push(part);
            norm.title = norm.title.replace(", " + part, "").trim();
        }
    });
    if (/a\.k\.a .+$/.test(norm?.title) || /\(.+?\)/.test(norm?.title)) {
        const aliasReg = /\((.+?)\)/;
        const akaReg = /a\.k\.a (.+)$/;
        const aka = akaReg.exec(norm?.title);
        const alias = aliasReg.exec(norm?.title);
        if (aka?.[1]) {
            norm.aliases.push(aka?.[1]);
            norm.title = norm.title.replace(akaReg, "").trim();
        }
        if (alias?.[1]) {
            norm.aliases.push(alias?.[1]);
            norm.title = norm.title.replace(aliasReg, "").trim();
        }
    }
    origins.forEach((origin) => {
        if (norm.title.includes(origin)) {
            norm.attributes.push({ origin });
            norm.title = norm.title.replace(origin, "").trim();
        }
    });
    return norm;
};
