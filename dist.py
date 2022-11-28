import asyncio, shutil
from pathlib import Path
from dev import docs_lib


_dir = Path(__file__).parent


async def module():
    proc = f'npx parcel build --no-cache --target module'
    print(proc)
    proc = await asyncio.create_subprocess_shell(proc)
    await proc.communicate()


async def bundle():
    proc = f'npx parcel build --no-cache --target bundle'
    print(proc)
    proc = await asyncio.create_subprocess_shell(proc)
    await proc.communicate()

    # Copy bundle javascript to docs
    src = _dir.joinpath('dist/bundle/')
    dest = _dir.joinpath('docs/_asset/adapter/')
    try:
        dest.mkdir(parents=True)
    except FileExistsError:
        pass
    print(f'Copy: {src} -> {dest}')
    shutil.copytree(src, dest, dirs_exist_ok=True)


async def docs():
    src = _dir.joinpath('docs-src')
    src = f'{src}/**/*.(scss|js|ts)'
    proc = f"npx parcel build '{src}' --target docs"
    print(proc)
    proc = await asyncio.create_subprocess_shell(proc)
    await proc.communicate()


async def main():
    await asyncio.gather(
        module(),
        bundle(),
        docs(),
    )

if __name__ == "__main__":
    asyncio.run(main())