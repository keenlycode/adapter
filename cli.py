import asyncio
import fire


async def dist():
    cmd = "npm run dist"
    proc = await asyncio.create_subprocess_shell(cmd)
    await proc.communicate()

async def npm_docs():
    cmd = 'npm run docs'
    print(cmd)
    proc = await asyncio.create_subprocess_shell(cmd)
    await proc.communicate()

async def engrave_docs():
    cmd = "engrave dev docs-src docs --asset"
    print(cmd)
    proc = await asyncio.create_subprocess_shell(cmd)
    await proc.communicate()

async def docs():
    try:
        await asyncio.gather(
            npm_docs(),
            engrave_docs(),
        )
    except asyncio.exceptions.CancelledError:
        pass

async def jest():
    cmd = "npx jest src/ --watch"
    print(cmd)
    proc = await asyncio.create_subprocess_shell(cmd)
    await proc.communicate()
    

class CLI():
    async def dist(self):
        await dist()

    async def docs(self):
        await docs()

    async def dev(self):
        await asyncio.gather(
            jest(),
            docs(),
        )

if __name__ == '__main__':
    fire.Fire(CLI)