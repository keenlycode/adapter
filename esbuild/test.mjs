import * as esbuild from "esbuild";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { glob } from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const test_src_dir = path.join(__dirname, "../test-src");

async function test() {
  const entryFiles = await glob(path.join(test_src_dir, "**/*.{ts,html}"), {
    ignore: path.join(test_src_dir, "**/_*"),
  });

  const outDir = path.join(__dirname, "../docs/test");
  console.log(`Create test at: ${outDir}`);

  const result = await esbuild.context({
    entryPoints: entryFiles,
    entryNames: "[dir]/[name]",
    assetNames: "[dir]/[name]",
    outdir: outDir,
    outbase: test_src_dir,
    bundle: true,
    format: "esm",
    sourcemap: true,
    keepNames: true,
    color: true,
    loader: {
      ".html": "copy",
    },
  });
  await result.watch();
  const { host, port } = await result.serve({
    servedir: "docs/test",
  });
  console.log(`\n> Test server => http://${host}:${port}/\n`);
}

await test();
