import * as esbuild from "esbuild";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { glob } from "glob";
import { platform } from "node:process";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let files, result = null;

// let files = await glob(path.join(__dirname, "../src/**/*.{ts,js}"), {
//   ignore: path.join(__dirname, "../src/**/*.bundle.{ts,js}"),
// });

// console.log(
// `📦️ Create adapter distributed files
// ===================================`);

// let result = await esbuild.build({
//   entryPoints: files,
//   bundle: false,
//   outdir: "dist/browser/",
//   outbase: path.join(__dirname, "../src/"),
//   format: "esm",
//   platform: "browser",
//   lineLimit: 80,
//   keepNames: false,
//   minify: false,
//   sourcemap: true,
//   metafile: true,
//   logLevel: "info",
// });

// console.log(
//   await esbuild.analyzeMetafile(result.metafile, {
//     verbose: true,
//   })
// );

files = await glob(path.join(__dirname, "../src/**/*.bundle.{ts,js}"));

console.log(
`📦️ Create library bundle files
=======================================`);

result = await esbuild.build({
  entryPoints: files,
  bundle: true,
  outdir: "dist/browser/",
  outbase: path.join(__dirname, "../src/"),
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
