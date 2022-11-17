import asyncio


async def module():
    proc = f'npx parcel build --target module'
    print(proc)
    proc = await asyncio.create_subprocess_shell(proc)
    await proc.communicate()

async def main():
    await asyncio.gather(
        module(),
    )


asyncio.run(main())