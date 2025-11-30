import * as esbuild from "esbuild";
import * as path from "@std/path";
import * as fg from "fast-glob";

const __filename = path.fromFileUrl(import.meta.url);
const __dirname = path.dirname(__filename);
const test_src_dir = path.join(__dirname, "../test-src");

async function test() {
  const entryFiles = await fg.default.async(path.join(test_src_dir, "**/*.ts"), {
    ignore: path.join(test_src_dir, "**/_*"),
  });

  console.log(entryFiles)

  const outDir = path.join(__dirname, "../docs/test");
  console.log(`Create test at: ${outDir}`);

  const ctx = await esbuild.context({
    entryPoints: entryFiles,
    entryNames: "[dir]/[name]",
    assetNames: "[dir]/[name]",
    outdir: outDir,
    outbase: test_src_dir,
    bundle: true,
    format: "esm",
    sourcemap: true,
    keepNames: true,
    color: true
  });
  await ctx.watch();
}

await test();
