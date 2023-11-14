import asyncio


async def build():
    proc = await asyncio.create_subprocess_shell(
        "npm run build"
    )
    await proc.communicate()

async def npm_docs():
    proc = await asyncio.create_subprocess_shell("npm run docs")
    
    await proc.communicate()

async def engrave_docs():
    proc = await asyncio.create_subprocess_shell(
        "engrave dev docs-src docs --asset",
    )
    await proc.communicate()

async def dev(mode='build'):
    pass

async def main():
    try:
        await asyncio.gather(
            npm_docs(),
            engrave_docs(),
        )
    except asyncio.exceptions.CancelledError:
        pass
    

asyncio.run(main())