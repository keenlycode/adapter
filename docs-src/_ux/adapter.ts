import { AdapterMixin, stylis } from '@devcapsule/adapter';

class Adapter extends AdapterMixin(HTMLElement) {
    static cssProcess(css: string): string {
        return stylis(css);
    }
}

export { Adapter };