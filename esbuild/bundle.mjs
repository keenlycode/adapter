import * as esbuild from 'esbuild'
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function bundle() {
    const entryFiles = [];
    entryFiles.push(path.join(__dirname, '../src/export.ts'));
    console.log(entryFiles);
    const outFile = path.join(__dirname, '../dist/bundle/adapter.js');
    console.log(outFile);

    const result = esbuild.build({
        entryPoints: entryFiles,
        outfile: outFile,
        outbase: 'docs-src',
        bundle: true,
        format: "esm",
        sourcemap: true,
        keepNames: true,
        minify: true,
    })
}

bundle();