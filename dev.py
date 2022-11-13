import asyncio, shutil


async def engrave():
    proc = 'engrave dev docs-src docs'
    print(proc)
    proc = await asyncio.create_subprocess_shell(proc)
    await proc.communicate()


async def http():
    proc = 'python -m http.server --directory docs'
    print(proc)
    proc = await asyncio.create_subprocess_shell(proc)
    await proc.communicate()


async def main():
    await asyncio.gather(
        engrave(),
        http(),
    )


asyncio.run(main())