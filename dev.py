import asyncio
import signal


async def build():
    proc = await asyncio.create_subprocess_shell(
        "npx parcel watch --no-cache 'src/**/*!(.test.ts)' --target=build"
    )
    await proc.communicate()

async def parcel_docs():
    proc = await asyncio.create_subprocess_shell(
        "npx parcel watch --no-cache " +\
            "'docs-src/**/*.(js|ts)' --target=docs",
    )
    
    await proc.communicate()
    proc.send_signal(signal=signal.SIGINT)

async def engrave_docs():
    proc = await asyncio.create_subprocess_shell(
        "engrave dev docs-src docs --server --asset",
        stderr=asyncio.subprocess.PIPE
    )
    try:
        await proc.communicate()
    finally:
        proc.send_signal(signal=signal.SIGINT)

async def dev(mode='build'):
    pass

async def main():
    try:
        await asyncio.gather(
            parcel_docs(),
            engrave_docs(),
        )
    except ProcessLookupError:
        pass
    

asyncio.run(main())