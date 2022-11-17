import asyncio, shutil
from pathlib import Path


_dir = Path(__file__).parent


async def engrave():
    proc = 'engrave dev docs-src docs'
    print(proc)
    proc = await asyncio.create_subprocess_shell(proc)
    await proc.communicate()


async def docs():
    src_dir = _dir.joinpath('docs-src').resolve()
    src_dir = f'{src_dir}/**/*.(scss|js|ts)'
    dest_dir = _dir.joinpath('docs')
    proc = f"npx parcel watch '{src_dir}' --dist-dir {dest_dir}"
    proc = await asyncio.create_subprocess_shell(proc)
    await proc.communicate()


async def lib():
    src = _dir.joinpath('node_modules/highlight.js/styles/github.css')
    dest_dir = _dir.joinpath('docs/_asset/highlight.js/styles/')
    try:
        dest_dir.mkdir(parents=True)
    except FileExistsError:
        pass
    shutil.copy(src, dest_dir)


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