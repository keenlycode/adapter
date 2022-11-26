import { define, Adapter } from '../src/adapter';
import { color } from './color';


class ID_Highlight extends Adapter {};
define('id-highlight', ID_Highlight);
ID_Highlight.tagStyle(`
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
        border: 7px double white;
        > h1 {
            width: 100%;
        }
    }
`);


class ID_Footer extends Adapter {};
define('id-footer', ID_Footer);
ID_Footer.tagStyle(`
    display: flex;
    min-height: 30vh;
    width: 100%;
`);