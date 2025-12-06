import * as esbuild from "esbuild";
import * as path from "@std/path";
import * as fg from "fast-glob";


const __filename = path.fromFileUrl(import.meta.url);
const __dirname = path.dirname(__filename);

let files, result = null;

files = await fg.default.async("src/**/*.bundle.{ts,js}");

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

files = await fg.default.sync("src/**/*.{ts,js}", {
  ignore: "src/**/*.bundle.{ts,js}"
});

console.log(
`📦️ Create adapter distributed files
===================================`);

result = await esbuild.build({
  entryPoints: files,
  bundle: false,
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

await esbuild.stop()
