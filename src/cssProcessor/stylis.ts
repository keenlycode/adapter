import { compile, serialize, stringify } from 'stylis';

export function stylis(css: string) {
  return serialize(compile(css), stringify);
}
