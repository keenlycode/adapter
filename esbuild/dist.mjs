import * as esbuild from "esbuild";
import { fileURLToPath } from "url";
import path from "path";
import { glob } from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


let files = await glob(path.join(__dirname, '../src/**/*.ts'), {
    ignore: path.join(__dirname, '../src/**/*.bundle.ts'),
});

let result = await esbuild.build({
    entryPoints: files,
    bundle: false,
    outdir: "dist",
    outbase: path.join(__dirname, '../src'),
    format: "esm",
    lineLimit: 80,
    keepNames: false,
    minify: false,
    sourcemap: true,
    metafile: true,
    logLevel: "info",
});

console.log(await esbuild.analyzeMetafile(result.metafile, {
    verbose: true,
}))

// process.exit(0);

files = await glob(path.join(__dirname, '../src/**/*.bundle.ts'));

result = await esbuild.build({
    entryPoints: files,
    bundle: true,
    outdir: "dist",
    outbase: path.join(__dirname, '../src'),
    format: "esm",
    lineLimit: 80,
    keepNames: false,
    minify: false,
    sourcemap: true,
    metafile: true,
    logLevel: "info",
});

console.log(await esbuild.analyzeMetafile(result.metafile, {
    verbose: true,
}))
