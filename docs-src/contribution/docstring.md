# Adapter Docstring Guide

This project follows the **NumPy Docstring Standard** for documenting classes, methods, and functions.

NumPy docstrings are widely considered the clearest and most human‑friendly scientific documentation style — and they work extremely well for JavaScript/TypeScript projects when adapted with Markdown.

For full reference, see the official spec:

* NumPy Documentation: [https://numpydoc.readthedocs.io/en/latest/format.html](https://numpydoc.readthedocs.io/en/latest/format.html)
* NumPy Docstring Guide: [https://numpydoc.readthedocs.io/en/latest/example.html](https://numpydoc.readthedocs.io/en/latest/example.html)

---

## Purpose

* Provide a consistent, readable docstring format across the project.
* Make Adapter's API easy to understand for contributors.
* Enable future tooling (AI-assisted docs, extraction scripts, etc.) to parse documentation reliably.
* Reduce token usage by avoiding JSON-heavy or overly verbose structures.

---

## General Rules

1. **Use block comments**: `/** ... */` above classes, methods, and functions.
2. **Start with a one-line summary**.
3. Write in plain English, concise and factual.
4. Use section headers inspired by Numpydoc:

   * Summary (implicit first line)
   * Parameters
   * Returns
   * Raises
   * Examples
   * Notes
   * See Also
5. Use Markdown formatting inside docstrings whenever needed.
6. Avoid embedding JSON-like structures inside docstrings.
7. Keep examples small and directly relevant.

---

## Recommended Template

````ts title="TypeScript"
/**
 * Short summary describing what this class/function does.
 *
 * Parameters
 * ----------
 * name : type
 *     Description of the parameter.
 * value : type, optional
 *     Optional parameter.
 *
 * Returns
 * -------
 * type
 *     Description of return value.
 *
 * Raises
 * ------
 * ErrorType
 *     When and why this error occurs.
 *
 * Examples
 * --------
 * ```ts
 * // Example usage
 * const x = something();
 * ```
 *
 * Notes
 * -----
 * Additional details or special behaviors.
 *
 * See Also
 * --------
 * OtherFunction : Description
 */
````

---

## Example: Class Documentation

```ts title="TypeScript"
/**
 * Base class for all Adapter-powered custom elements.
 *
 * Notes
 * -----
 * This class provides core styling, registration, and scoping logic.
 */
export class Adapter {
  ...
}
```

---

## Example: Method Documentation

````ts title="TypeScript"
/**
 * Register the custom element with the browser.
 *
 * Parameters
 * ----------
 * tagName : string
 *     The tag name used for the custom element.
 * options : DefineOptions, optional
 *     Configuration for scoping, lifecycle, or extensions.
 *
 * Returns
 * -------
 * void
 *     This method does not return a value.
 *
 * Raises
 * ------
 * TypeError
 *     If `tagName` is not valid.
 *
 * Examples
 * --------
 * ```ts
 * class Card extends Adapter {}
 * Card.define("el-card");
 * ```
 */
static define(tagName: string, options?: DefineOptions) {
  ...
}
````

---

## Writing Tips

### Be concise

The first line should summarize purpose clearly.

### Prefer natural language over technical noise

Good docstrings are short, readable, and helpful.

### Use Markdown

Tables, code blocks, inline code (`like this`) are allowed.

### Keep headings exact

Extraction scripts depend on predictable section names:

* `Parameters`
* `Returns`
* `Raises`
* `Examples`
* `Notes`
* `See Also`

### Treat docstrings like public API

Even internal methods benefit from clear explanation.

---

## Future Extensions

This guide may support additional sections in the future:

* **Attributes** – For classes with exposed properties.
* **Events** – For custom element emission patterns.
* **Lifecycle** – For Adapter-specific callbacks.
* **Constraints** – For validator or parser components.

---

## Extraction Pipeline (Optional)

If using a custom extraction tool, it will:

1. Scan `src/` for `/** ... */` blocks.
2. Identify sections using headings.
3. Generate Markdown or structured data for AI tools.

This guide is designed so extraction remains simple and robust.

---

## Final Notes

* This is the **official docstring format** for Adapter.
* All contributors should follow this guide for consistency.
* Suggestions for improvement are welcome as Adapter evolves.
