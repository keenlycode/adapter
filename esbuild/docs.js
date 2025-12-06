import * as esbuild from "esbuild";
import * as path from "@std/path";
import * as fg from "fast-glob";


const __filename = path.fromFileUrl(import.meta.url);
const __dirname = path.dirname(__filename);
const docs_src_dir = path.join(__dirname, "../docs-src/");


const outDir = path.join(__dirname, "../docs/");
console.log(`Create docs at: ${outDir}`);


let entryFiles = await fg.default.async(
  path.join(docs_src_dir, `**/*.bundle.ts`),
);

const js_bundle = await esbuild.context({
  entryPoints: entryFiles,
  entryNames: "[dir]/[name]",
  outdir: outDir,
  outbase: "docs-src",
  bundle: true,
  format: "esm",
  target: ["chrome100"],
  sourcemap: true,
  keepNames: true,
  lineLimit: 80,
  minifyWhitespace: true,
  minifyIdentifiers: false,
  minifySyntax: true,
  logLevel: "info",
  alias: {
    '@devcapsule/adapter': path.join(__dirname, '../src/mod.ts')
  }
})

await js_bundle.watch()

const glob_extension = ".{ts,js,svg,png,jpg,ttf}"
entryFiles = await fg.default.async(
  path.join(docs_src_dir, `**/*${glob_extension}`),
  {
    ignore: path.join(docs_src_dir, `**/*.bundle.ts`)
  }
);

const js_compile = await esbuild.context({
  entryPoints: entryFiles,
  entryNames: "[dir]/[name]",
  loader: {
    ".png": "copy",
    ".svg": "copy",
    ".jpg": "copy",
    ".ttf": "copy",
  },
  outdir: outDir,
  outbase: "docs-src",
  bundle: false,
  format: "esm",
  target: ["chrome100"],
  sourcemap: true,
  keepNames: true,
  lineLimit: 80,
  minifyWhitespace: true,
  minifyIdentifiers: false,
  minifySyntax: true,
  logLevel: "info",
});

await js_compile.watch();
