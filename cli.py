import asyncio
import fire


async def build():
    cmd = "npm run build"
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

async def dev():
    cmd = "npx jest src/ --watch"
    print(cmd)
    proc = await asyncio.create_subprocess_shell(cmd)
    await proc.communicate()
    

# asyncio.run(main())

class CLI():
    async def build(self):
        await build()

    async def docs(self):
        await docs()

    async def dev(self):
        await dev()

if __name__ == '__main__':
    fire.Fire(CLI)