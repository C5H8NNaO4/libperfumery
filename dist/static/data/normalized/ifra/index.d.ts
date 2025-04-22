import { NormalizedIFRAEntry } from "../../../../types/NormalizedItem.js";
import { CAS } from "../../../../types/fields.js";
declare const ifraEntries: NormalizedIFRAEntry[];
declare const stdLibByCas: Record<CAS, NormalizedIFRAEntry>;
export { stdLibByCas };
export default ifraEntries;
