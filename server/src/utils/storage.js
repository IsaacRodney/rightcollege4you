import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, "..", "..", "data");

export async function readJson(fileName) {
  return JSON.parse(await fs.readFile(path.join(dataDir, fileName), "utf-8"));
}

export async function writeJson(fileName, data) {
  await fs.writeFile(path.join(dataDir, fileName), JSON.stringify(data, null, 2));
}
