import * as esbuild from "esbuild";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let result = await esbuild.build({
    entryPoints: [
        path.join(__dirname, "../src/export.ts"),
        // path.join(__dirname, "../src/style.ts"),
    ],
    bundle: true,
    outdir: "dist",
    format: "esm",
    lineLimit: 80,
    keepNames: true,
    minify: true,
    sourcemap: true,
    metafile: true,
    logLevel: "info",
});

console.log(await esbuild.analyzeMetafile(result.metafile, {
    verbose: true,
}))