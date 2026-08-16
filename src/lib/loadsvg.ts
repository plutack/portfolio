import fs from "fs";
import { join } from "path";

export default function loadSvg(name: string) {
    const filepath = join(process.cwd(), "public", "svgs", `${name}.svg`);
    return fs.readFileSync(filepath, "utf8");
}
