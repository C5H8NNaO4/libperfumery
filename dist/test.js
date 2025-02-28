import { perfumeIngredientsOdours } from "./static/data/descriptions.js";
import fs from "fs";
fs.writeFileSync("./src/static/data/generated/odors.json", JSON.stringify(perfumeIngredientsOdours));
