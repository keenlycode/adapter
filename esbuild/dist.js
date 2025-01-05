import * as esbuild from "esbuild";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { glob } from "glob";
import { platform } from "node:process";


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

let files, result = null;

files = await glob("src/**/*.bundle.{ts,js}");

console.log(
`📦️ Create library bundle files
=======================================`);

result = await esbuild.build({
  entryPoints: files,
  bundle: true,
  outdir: "dist/browser/",
  outbase: "src/",
  format: "esm",
  platform: "browser",
  lineLimit: 80,
  keepNames: false,
  minify: true,
  sourcemap: true,
  metafile: true,
  logLevel: "info",
});

console.log(
  await esbuild.analyzeMetafile(result.metafile, {
    verbose: true,
  })
);

files = await glob("dist/browser/**/*.js", {
  ignore: "dist/**/*.bundle.js"
});

console.log(
`📦️ Create adapter distributed files
===================================`);

result = await esbuild.build({
  entryPoints: files,
  bundle: false,
  outdir: "dist/browser/",
  outbase: "dist/browser/",
  format: "esm",
  platform: "browser",
  lineLimit: 80,
  keepNames: false,
  minify: true,
  allowOverwrite: true,
  sourcemap: true,
  metafile: true,
  logLevel: "info",
});

console.log(
  await esbuild.analyzeMetafile(result.metafile, {
    verbose: true,
  })
);

await esbuild.stop()
