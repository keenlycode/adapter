import * as esbuild from "esbuild";
import { fileURLToPath } from "url";
import path from "path";
import { glob } from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docs_src_dir = path.join(__dirname, "../docs-src/");

async function javascript() {
  const entryFiles = await glob(
    path.join(docs_src_dir, "test/**/*.ts"),
    {
      ignore: path.join(docs_src_dir, "test/**/_*"),
    }
  );

  const outDir = path.join(__dirname, "../docs/test/");
  console.log(`Create test at: ${outDir}`);

  const result = await esbuild.context({
    entryPoints: entryFiles,
    entryNames: "[dir]/[name]",
    outdir: outDir,
    outbase: "docs-src/test",
    bundle: true,
    format: "esm",
    sourcemap: true,
    keepNames: true,
    color: true,
  });
  await result.watch();
  const { host, port } = await result.serve({
    servedir: "docs",
  });
  console.log(`\n> Test server => http://${host}:${port}/test/\n`);
}

async function html() {
  const entryFiles = await glob(
    path.join(docs_src_dir, "test/**/*.html"),
    {
      ignore: path.join(docs_src_dir, "test/**/_*"),
    }
  );
  console.log(entryFiles);

  const outDir = path.join(__dirname, "../docs/test/");
  console.log(`Create test at: ${outDir}`);

  const result = await esbuild.context({
    entryPoints: entryFiles,
    entryNames: "[dir]/[name]",
    outdir: outDir,
    outbase: "docs-src/test",
    keepNames: true,

    loader: {
      ".html": "text",
    },
  });
  await result.watch();
  const { host, port } = await result.serve({
    servedir: "docs",
  });
  console.log(`\n> Test server => http://${host}:${port}/test/\n`);
}

// await javascript();
await html();
