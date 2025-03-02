import page1 from "./page1.json" assert { type: "json" };
import page2 from "./page2.json" assert { type: "json" };
import page3 from "./page3.json" assert { type: "json" };
const normalizedPW = [page1, page2, page3].flat();
export default normalizedPW;
