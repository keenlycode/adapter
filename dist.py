import asyncio
from dev import parcel_docs, docs_lib, engrave


async def module():
    proc = f"npx parcel build --no-cache --target module"
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
    # await bundle()


if __name__ == "__main__":
    asyncio.run(main())