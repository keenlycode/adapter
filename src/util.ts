const sleepSync = (ms: number) => {
    const end = new Date().getTime() + ms;
    let time = new Date().getTime();
    while (time < end) {
        time = new Date().getTime()
    }
    return time;
}

function uuid() {
    return sleepSync(1).toString(36);
}

export { sleepSync, uuid };