import asyncio, shutil
from pathlib import Path


_dir = Path(__file__).parent


async def engrave():
    proc = 'engrave dev docs-src docs'
    print(proc)
    proc = await asyncio.create_subprocess_shell(proc)
    await proc.communicate()


async def docs():
    src = _dir.joinpath('docs-src').resolve()
    src = f'{src}/**/*.(scss|js|ts)'
    proc = f"npx parcel watch '{src}' --target docs"
    print(proc)
    proc = await asyncio.create_subprocess_shell(proc)
    await proc.communicate()


async def lib():
    src = _dir.joinpath('node_modules/highlight.js/styles/github.css')
    dest = _dir.joinpath('docs/_asset/highlight.js/styles/')
    try:
        dest.mkdir(parents=True)
    except FileExistsError:
        pass
    print(f'Copy: {src} -> {dest}')
    shutil.copy(src, dest)


async def http():
    proc = 'python -m http.server --directory docs'
    print(proc)
    proc = await asyncio.create_subprocess_shell(proc)
    await proc.communicate()


async def main():
    await asyncio.gather(
        engrave(),
        lib(),
        docs(),
        http(),
    )


asyncio.run(main())