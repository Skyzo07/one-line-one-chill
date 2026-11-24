import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Line, One Chill — the winning line, chosen by the CrowLLM judge panel
// (panel-results.json) over the top 3 internal candidates.
const LINE =
  "My twin's autopsy lists a cause of death I haven't died of yet, and the date on the report is tomorrow.";

// Gate guard: the entry must be UTF-8 text of 1 to 200 characters, a single
// line, and not only whitespace. Fail loudly rather than emit an invalid file.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`wrote ${LINE.length}-character entry to ${join(outDir, "entry.txt")}`);
