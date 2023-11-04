import asyncio, shutil
from pathlib import Path


_dir = Path(__file__).parent


# async def bundle():
#     proc = f'npx parcel watch --no-cache --no-hmr --target docs-bundle'
#     print(proc)
#     proc = await asyncio.create_subprocess_shell(proc)
#     await proc.communicate()


async def docs_lib():
    # Highlight.js
    src = _dir.joinpath('node_modules/highlight.js/styles/github.css')
    dest = _dir.joinpath('docs/lib/highlight.js/styles/')
    try:
        dest.mkdir(parents=True)
    except FileExistsError:
        pass
    print(f'Copy: {src} -> {dest}')
    shutil.copy(src, dest)

    # Normalize.css
    proc = f'npx parcel build node_modules/normalize.css/normalize.css --distdir=docs/lib/normalize.css'
    print(proc)
    proc = await asyncio.create_subprocess_shell(proc)
    await proc.communicate()

    # # Icomoon
    # src = _dir.joinpath('docs-src/asset/icomoon/')
    # dest = _dir.joinpath('docs/asset/icomoon')
    # try:
    #     dest.mkdir(parents=True)
    # except FileExistsError:
    #     pass
    # print(f'Copy: {src} -> {dest}')
    # shutil.copytree(src, dest, dirs_exist_ok=True)


async def engrave(build=False):
    server = '0.0.0.0:8000'
    mode = 'dev'
    if build:
        mode = 'build'
    proc = f'engrave {mode} docs-src docs --server={server} --asset'
    print(proc)
    proc = await asyncio.create_subprocess_shell(proc)
    await proc.communicate()


async def parcel_docs(build=False):
    src = _dir.joinpath('docs-src').resolve()
    src = f'{src}/**/*.(scss|js|ts|jpg|png)'
    mode = 'watch'
    if build:
        mode = 'build'
    proc = f"npx parcel {mode} --no-cache '{src}' --target docs"
    print(proc)
    proc = await asyncio.create_subprocess_shell(proc)
    await proc.communicate()


async def main():
    await docs_lib()
    await asyncio.gather(
        engrave(),
        parcel_docs(),
    )


if __name__ == "__main__":
    asyncio.run(main())