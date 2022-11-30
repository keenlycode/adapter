import { define, Adapter } from '@nitipit/adapter/src/adapter';
import { color } from '../color';


class ID_Header extends Adapter {};
define('id-header', ID_Header);
ID_Header.tagStyle(`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: ${color.p3};
    color: white;
    .container {
        width: 90%;
        max-width: 600px;
        margin: 2rem;
        text-align: center;
        > h1 {
            width: 100%;
        }
    }
`);