import { define, Adapter } from '@nitipit/adapter/src/adapter';


class ID_Footer extends Adapter {};

ID_Footer.define('id-footer');
ID_Footer.tagStyle(`
    display: flex;
    width: 100%;
    padding-bottom: 20vh;
`);