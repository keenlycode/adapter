export function sleepSync(ms: number) {
  const end = new Date().getTime() + ms;
  let time = new Date().getTime();
  while (time < end) {
    time = new Date().getTime();
  }
  return time;
}

export function uuid() {
  return sleepSync(1).toString(36);
}

export function css(strings: TemplateStringsArray, ...values: any[]) {
  return String.raw(strings, ...values);
}
