import * as esbuild from 'esbuild'
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function docs() {
    const entryFiles = [];
    entryFiles.push(path.join(__dirname, '../docs-src/**/*.ts'));
    console.log(entryFiles);
    const outDir = path.join(__dirname, '../docs/');
    console.log(outDir);

    const result = await esbuild.context({
        entryPoints: entryFiles,
        outdir: outDir,
        bundle: true,
        format: "esm",
        sourcemap: true,
        keepNames: true,
    })
    await result.watch();
    const { host, port } = await result.serve({
        servedir: "docs"
    })
    console.log(`${host}:${port}`);
}

await docs();