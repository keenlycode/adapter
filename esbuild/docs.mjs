import * as esbuild from 'esbuild'
import { fileURLToPath } from 'url';
import path from 'path';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docs_src_dir = path.join(__dirname, '../docs-src/');
const entryFiles = await glob.sync(
    path.join(docs_src_dir, '**/*.{ts,js,svg,png,jpg}'),
    {
        ignore: path.join(docs_src_dir, '**/_*')
    }
);

console.log(entryFiles);

const outDir = path.join(__dirname, '../docs/');
console.log(`Create docs at: ${outDir}`);

const result = await esbuild.context({
    entryPoints: entryFiles,
    entryNames: '[dir]/[name]',
    loader: {
        '.png': 'copy',
        '.svg': 'copy',
        '.jpg': 'copy',
    },
    outdir: outDir,
    outbase: 'docs-src',
    bundle: true,
    format: "esm",
    sourcemap: true,
    keepNames: true,
    lineLimit: 80,
    minifyWhitespace: true,
    minifyIdentifiers: false,
    minifySyntax: true,
    color: true,
    logLevel: "info",
})
await result.watch();
const { host, port } = await result.serve({
    servedir: "docs"
})
console.log(`docs server => http://${host}:${port}`);