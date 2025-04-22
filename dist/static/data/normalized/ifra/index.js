import ifra from "./ifra.json" assert { type: "json" };
const ifraEntries = ifra;
const stdLibByCas = ifra.reduce((acc, itm) => ({
    ...acc,
    [itm.cas]: itm,
}), {});
export { stdLibByCas };
export default ifraEntries;
