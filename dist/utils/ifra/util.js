import { stdLibByCas } from "../../static/data/normalized/ifra/index.js";
export const isRestricted = (cas) => {
    if (!stdLibByCas[cas])
        return false;
    return stdLibByCas[cas].attributes?.some((attr) => attr.type === "flag" && attr.value === "R");
};
export const isProhibited = (cas) => {
    if (!stdLibByCas[cas])
        return false;
    return stdLibByCas[cas].attributes?.some((attr) => attr.type === "flag" && attr.value === "P");
};
export const hasSpecification = (cas) => {
    if (!stdLibByCas[cas])
        return false;
    return stdLibByCas[cas].attributes?.some((attr) => attr.type === "flag" && attr.value === "S");
};
export const isFlagged = (cas) => {
    if (!stdLibByCas[cas])
        return false;
    return stdLibByCas[cas].attributes?.some((attr) => attr.type === "flag");
};
