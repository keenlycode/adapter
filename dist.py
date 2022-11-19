import asyncio
from pathlib import Path


_dir = Path(__file__).parent


async def module():
    proc = f'npx parcel build --target module'
    print(proc)
    proc = await asyncio.create_subprocess_shell(proc)
    await proc.communicate()

async def js():
    proc = f'npx parcel build --target js'
    print(proc)
    proc = await asyncio.create_subprocess_shell(proc)
    await proc.communicate()

async def docs():
    src = _dir.joinpath('docs-src').resolve()
    src = f'{src}/**/*.(scss|js|ts)'
    proc = f"npx parcel build '{src}' --target docs "
    print(proc)
    proc = await asyncio.create_subprocess_shell(proc)
    await proc.communicate()

async def main():
    await asyncio.gather(
        module(),
        js(),
        docs(),
    )


asyncio.run(main())