import asyncio
from pathlib import Path
from dev import docs, docs_lib, engrave


async def module():
    proc = f"npx parcel build --no-cache 'src/adapter.ts' --target module"
    print(proc)
    proc = await asyncio.create_subprocess_shell(proc)
    await proc.communicate()


async def bundle():
    proc = f'npx parcel build --no-cache --target bundle'
    print(proc)
    proc = await asyncio.create_subprocess_shell(proc)
    await proc.communicate()


async def main():
    await module()
    await bundle()
    await docs_lib()
    await engrave(build=True)
    await docs(build=True)


if __name__ == "__main__":
    asyncio.run(main())