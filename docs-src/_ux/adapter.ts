import { Adapter as _Adapter, stylis } from '@devcapsule/adapter';


class Adapter extends _Adapter {
    static cssProcess(css: string): string {
        return stylis(css);
    }
}

export { Adapter };