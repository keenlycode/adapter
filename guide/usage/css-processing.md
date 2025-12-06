# CSS Processing with Tagged Templates (PostCSS, Stylis)

Adapter expects plain strings for `static css`, `addStyle`, and instance `css`, but you can feed it **processed** strings produced by your own tagged template. That keeps processing local to the call site—no extra hook or global setting.

---

## 1. Flow

1) Write a tagged template that transforms CSS and returns a string.  
2) Use it when assigning class or instance CSS:

```ts
class Panel extends Adapter {}

Panel.css = myTag`
  display: grid;
  gap: 1rem;
`;
// or per instance:
const panel = new Panel();
panel.css = myTag`
  & h2 { font-weight: 700; }
`;
```

The tag runs once when you assign, and Adapter simply consumes the returned string.

---

## 2. Stylis (nesting + prefixing)

```ts
import { compile, serialize, stringify } from "stylis";
import { Adapter } from "@devcapsule/adapter";

const stylisCss = (strings: TemplateStringsArray, ...values: unknown[]) => {
  const input = String.raw({ raw: strings }, ...values);
  return serialize(compile(input), stringify);
};

class Badge extends Adapter {
  static css = stylisCss`
    display: inline-flex;
    padding: 0.25rem 0.5rem;
    border-radius: 999px;
    background: #111827;
    color: white;

    & strong {
      font-weight: 700;
    }
  `;
}

Badge.define("ui-badge");

// Instance override using the same tag
const special = new Badge();
special.css = stylisCss`
  background: #2563eb;
`;
```

---

## 3. PostCSS (nested + autoprefixer) synchronously

```ts
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import nested from "postcss-nested";
import { Adapter } from "@devcapsule/adapter";

// Use sync-friendly plugins so this stays synchronous.
const postcssCss = (strings: TemplateStringsArray, ...values: unknown[]) => {
  const input = String.raw({ raw: strings }, ...values);
  const result = postcss([nested(), autoprefixer()])
    .process(input, { from: undefined });
  return result.css;
};

class Drawer extends Adapter {
  static css = postcssCss`
    display: block;
    width: 320px;
    & header {
      font-weight: 600;
    }
  `;
}

Drawer.define("ui-drawer");
```

Because `postcssCss` returns a string immediately, it fits into Adapter’s synchronous style assignments.

---

## 4. Tips

- Keep processing local: pick the tag you need per component instead of a global hook.
- Reuse the same tag for `static css`, `addStyle`, and per-instance `css` when you want consistent transforms.
- Avoid async PostCSS plugins; Adapter expects a string right away.
