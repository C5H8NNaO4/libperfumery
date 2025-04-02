import { normalize } from "@/utils/perfumersApprentice";
import fs from "fs";
const files = [
  "./src/static/data/scraped/pa/0B.json",
  "./src/static/data/scraped/pa/CD.json",
  "./src/static/data/scraped/pa/EG.json",
  "./src/static/data/scraped/pa/HK.json",
  "./src/static/data/scraped/pa/LN.json",
  "./src/static/data/scraped/pa/OR.json",
  "./src/static/data/scraped/pa/SZ.json",
];

for (const fileName of files) {
  const str = fs.readFileSync(fileName);
  const json = JSON.parse(str.toString());

  const norm = json.map(normalize);

  fs.writeFileSync(
    fileName.replace("scraped", "normalized"),
    JSON.stringify(norm)
  );

  console.log("Normalized file ", fileName);
}
