import * as esbuild from 'esbuild'
import { fileURLToPath } from 'url';
import path from 'path';
import { glob } from 'glob';

import { bundle } from './bundle.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function docs() {
    const docs_src_dir = path.join(__dirname, '../docs-src/');
    const entryFiles = await glob(
        path.join(docs_src_dir, '**/*.ts'),
        {
            ignore: path.join(docs_src_dir, '**/*.style.ts')
        }
    );
    // const entryFiles = [];
    // entryFiles.push(path.join(__dirname, '../docs-src/**/*.{ts,js}'));
    // console.log(entryFiles);
    const outDir = path.join(__dirname, '../docs/');
    console.log(`Create docs at: ${outDir}`);

    const result = await esbuild.context({
        entryPoints: entryFiles,
        entryNames: '[dir]/[name]',
        outdir: outDir,
        outbase: 'docs-src',
        bundle: true,
        format: "esm",
        sourcemap: true,
        keepNames: true,
        minify: true,
        color: true,
        logLevel: "info",
    })
    await result.watch();
    const { host, port } = await result.serve({
        servedir: "docs"
    })
    console.log(`docs server => http://${host}:${port}`);
}

await docs();