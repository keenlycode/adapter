import { Adapter, AdapterMixin, IsolatorMixin } from '../../adapter';

class ElementA extends Adapter {
  // ...
}

class ElementB extends AdapterMixin(IsolatorMixin(HTMLElement)) {
  // ...
}

customElements.define('el-a', ElementA);
customElements.define('el-b', ElementB);
let test: any = new ElementA();
test = test.isolate('closed');
document.body.append(test);