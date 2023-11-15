import * as esbuild from 'esbuild'
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function bundle() {
    const entryFiles = [];
    entryFiles.push(path.join(__dirname, '../src/export.ts'));
    console.log(entryFiles);
    const outFile = path.join(__dirname, '../dist/adapter.js');
    console.log(outFile);

    const result = await esbuild.build({
        entryPoints: entryFiles,
        outfile: outFile,
        bundle: true,
        format: "esm",
        sourcemap: true,
        minify: true,
        metafile: true,
        keepNames: true,
    })
    console.log(await esbuild.analyzeMetafile(result.metafile))
}

await bundle();