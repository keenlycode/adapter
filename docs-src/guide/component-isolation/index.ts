import { Adapter, AdapterMixin, IsolatorMixin } from '../../adapter';

class ElementA extends Adapter {
  // ...
}

class ElementB extends AdapterMixin(IsolatorMixin(HTMLElement)) {
  // ...
}

customElements.define('el-a', ElementA);
customElements.define('el-b', ElementB);
let test = document.createElement('el-a');
test = test.isolate('closed');
console.log(test)
document.body.append(test);