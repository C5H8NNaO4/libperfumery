import OB from "./0B.json" assert { type: "json" };
import CD from "./CD.json" assert { type: "json" };
import EG from "./EG.json" assert { type: "json" };
import HK from "./HK.json" assert { type: "json" };
import LN from "./LN.json" assert { type: "json" };
import OR from "./OR.json" assert { type: "json" };
import SZ from "./SZ.json" assert { type: "json" };
const normalized = [...OB, ...CD, ...EG, ...HK, ...LN, ...OR, ...SZ];
export default normalized;
