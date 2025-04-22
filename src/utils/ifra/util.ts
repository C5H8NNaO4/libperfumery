import { stdLibByCas } from "@/static/data/normalized/ifra";
import { CAS } from "@/types/fields";

export const isRestricted = (cas?: CAS) => {
  if (!stdLibByCas[cas]) return false;
  return stdLibByCas[cas].attributes?.some(
    (attr) => attr.type === "flag" && attr.value === "R"
  );
};

export const isProhibited = (cas?: CAS) => {
  if (!stdLibByCas[cas]) return false;
  return stdLibByCas[cas].attributes?.some(
    (attr) => attr.type === "flag" && attr.value === "P"
  );
};

export const hasSpecification = (cas?: CAS) => {
  if (!stdLibByCas[cas]) return false;
  return stdLibByCas[cas].attributes?.some(
    (attr) => attr.type === "flag" && attr.value === "S"
  );
};

export const isFlagged = (cas?: CAS) => {
  if (!stdLibByCas[cas]) return false;
  return stdLibByCas[cas].attributes?.some((attr) => attr.type === "flag");
};
