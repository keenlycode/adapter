import chroma from "chroma-js";

/**
 * Re-export of the chroma-js library for convenient imports across the project.
 *
 * Usage:
 *  - Default import: `import chroma from ".../this-file";`
 *  - Named import:   `import { chroma } from ".../this-file";`
 *
 * Also export a helper type alias for the chroma static API.
 */
export type ChromaType = typeof chroma;
export { chroma };
export default chroma
