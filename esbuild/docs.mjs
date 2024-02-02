import * as esbuild from "esbuild";
import { fileURLToPath } from "url";
import path from "path";
import { glob } from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docs_src_dir = path.join(__dirname, "../docs-src/");

const outDir = path.join(__dirname, "../docs/");
console.log(`Create docs at: ${outDir}`);


const bundleFiles = await glob.sync(
  path.join(docs_src_dir, "**/*.bundle.{ts,js}"),
  {
    ignore: [
      path.join(docs_src_dir, "**/_*/**"),
      path.join(docs_src_dir, "**/_*")
    ],
  }
);

const bundleContext = await esbuild.context({
  entryPoints: bundleFiles,
  entryNames: "[dir]/[name]",
  outdir: outDir,
  outbase: "docs-src",
  bundle: true,
  format: "esm",
  target: ["chrome100"],
  sourcemap: true,
  keepNames: true,
  lineLimit: 80,
  minify: true,
  logLevel: "info",
  external: ['*.bundle.js'],
});

await bundleContext.watch();
console.log("Watch bundle files: ", bundleFiles);

const entryFiles = await glob.sync(
  path.join(docs_src_dir, "**/*.{ts,js,svg,png,jpg,ttf}"),
  {
    ignore: [
      path.join(docs_src_dir, "**/_*/**"),
      path.join(docs_src_dir, "**/_*"),
      path.join(docs_src_dir, "**/*.bundle.{ts,js}"),
    ],
  }
);

const context = await esbuild.context({
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

await context.watch();

const { host, port } = await context.serve({
  servedir: "docs",
});
console.log(`docs server => http://${host}:${port}`);
