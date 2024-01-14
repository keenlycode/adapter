import { Adapter } from "../../adapter.js";
import { color } from "../designToken.js";
import Color from "color";

export class BlockQuote extends Adapter {
  static css = /*css*/`
    display: flex;
    flex-wrap: wrap;

    blockquote {
      margin: 0;
      margin-top: 1rem;
      padding: 0rem 1rem;
      background-color: ${Color(color.yellow).alpha(0.2)};
      border-left: 0.25em solid ${color.yellow};
      border-bottom-left-radius: 0.5rem;
    }
  `;
}
