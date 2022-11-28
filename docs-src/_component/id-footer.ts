import { define, Adapter } from '@nitipit/adapter/src/adapter';


class ID_Footer extends Adapter {};
define('id-footer', ID_Footer);
ID_Footer.tagStyle(`
    display: flex;
    min-height: 30vh;
    width: 100%;
`);