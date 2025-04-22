import { NormalizedIFRAEntry } from "@/types/NormalizedItem";
import ifra from "./ifra.json" assert { type: "json" };
import { CAS } from "@/types/fields";

const ifraEntries = ifra as NormalizedIFRAEntry[];
const stdLibByCas = ifra.reduce(
  (acc, itm) => ({
    ...acc,
    [itm.cas]: itm,
  }),
  {}
) as Record<CAS, NormalizedIFRAEntry>;

export { stdLibByCas };
export default ifraEntries;
