import { Icon } from '@nitipit/icon/dist/icon';
import { addStyle } from '@nitipit/adapter/src/adapter';

Icon.href = '/_asset/icomoon/symbol-defs.svg';
customElements.define('el-icon', Icon);
addStyle`
el-icon {
    fill: currentColor;
    vertical-align: middle;
}
`