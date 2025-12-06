import { Adapter } from "../../_lib/adapter.bundle.js";
import { color } from "../designToken.js";
import { chroma } from "../../_lib/chroma.bundle.js";
import type { _ChromaType } from "../../_lib/chroma.bundle.js";

const css = String.raw

export class BlockQuote extends Adapter {
  static css = css`
    display: flex;
    flex-wrap: wrap;

    blockquote {
      margin: 0;
      margin-top: 1rem;
      padding: 0rem 1rem;
      background-color: ${chroma(color.yellow).alpha(0.2).css()};
      border-left: 0.25em solid ${color.yellow};
      border-bottom-left-radius: 0.5rem;
    }
  `;
}
