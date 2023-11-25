import * as esbuild from 'esbuild'
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function bundle(
        outfile=path.join(__dirname, '../dist/bundle/adapter.js')
) {
    console.log(`Create bundle: adapter.js`);
    console.log(`esbuild...`)
    const entryFiles = [];
    entryFiles.push(path.join(__dirname, '../src/export.ts'));
    console.log(`- entryFiles ${entryFiles}`);
    const outFile = outfile
    console.log(`- outfile: ${outFile}`);

    esbuild.build({
        entryPoints: entryFiles,
        outfile: outFile,
        bundle: true,
        format: "esm",
        sourcemap: true,
        keepNames: true,
        minify: true,
    })
}

bundle();