import { Adapter } from './adapter';
import { buttonStyle } from './_ux/ui/button';
import { color } from './_ux/designToken';
import { bgColor } from './_ux/style';


const css = String.raw;

class Heading extends Adapter {
  static css = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    padding-bottom: 2.5rem;
    ${bgColor(color.dark)}
    & h1 {
      display: inline-flex;
      font-size: 5rem;
      line-height: 1.5;
      margin-top: 2rem;
      background: rgb(49,153,154);
      background: linear-gradient(90deg, rgba(49,153,154,1) 0%, rgba(194,125,255,1) 50%, rgba(255,127,0,1) 100%);
      mask-image: url('asset/adapter.svg');
      mask-repeat: no-repeat;
      mask-position: center;
      mask-size: contain;
      span {
        opacity: 0;
      }
    }
    & h2, h3 {
        margin-top: 1.5rem;
    }
  `
};

class HeadingButtons extends Adapter {
  static css = css`
    button {
      margin: 1rem 1rem;
      & el-icon {
        margin-right: 0.5rem;
      }
    }
    button[el="github"] {
      ${buttonStyle(color.dark)}
    }
    button[el="discord"] {
      ${buttonStyle(color.light)}
    }
  `;
};


Heading.define('el-heading');
HeadingButtons.define('el-heading-buttons');

window.Adapter = Adapter;