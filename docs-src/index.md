# Adapter

<style>
  :root {
    --accent: #0ea5e9;
    --ink: #0b1224;
    --bg: #ffffff;
    --card: #f6f7fb;
    --muted: #4b5563;
    --border: #e4e7ec;
  }

  .landing {
    font-family: "Sora", "DM Sans", "Inter", system-ui, -apple-system, sans-serif;
    color: var(--ink);
    background: var(--bg);
    position: relative;
    overflow: hidden;
  }

  .landing-inner {
    max-width: 1080px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    display: grid;
    gap: 2rem;
  }

  .hero {
    display: grid;
    gap: 1.25rem;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 0.8rem;
    border-radius: 999px;
    background: rgba(14, 165, 233, 0.08);
    color: #0284c7;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    width: fit-content;
  }

  .hero h1 {
    font-size: clamp(2.4rem, 3vw, 3.2rem);
    letter-spacing: -0.02em;
    margin: 0;
  }

  .lede {
    font-size: 1.1rem;
    color: var(--muted);
    max-width: 700px;
    line-height: 1.6;
  }

  .cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.9rem 1.1rem;
    border-radius: 14px;
    border: 1px solid var(--border);
    background: #ffffff;
    color: var(--ink);
    font-weight: 700;
    text-decoration: none;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
    transition: transform 120ms ease, box-shadow 160ms ease, border-color 160ms ease;
  }

  .btn.primary {
    background: linear-gradient(120deg, #0ea5e9, #38bdf8);
    color: #f8fafc;
    border: none;
    box-shadow: 0 15px 45px rgba(14, 165, 233, 0.25);
  }

  .btn:hover {
    transform: translateY(-2px);
    border-color: #cbd5e1;
  }

  .meta {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    color: var(--muted);
    font-size: 0.95rem;
  }

  .pill {
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    background: rgba(14, 165, 233, 0.06);
    border: 1px solid var(--border);
  }

  .section {
    display: grid;
    gap: 1.25rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
  }

  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.2rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  }

  .card h3 {
    margin: 0 0 0.35rem;
  }

  .card p {
    margin: 0;
    color: var(--muted);
    line-height: 1.5;
  }

  /* Demo styles removed */

  .code-block {
    background: #0b1224;
    border: 1px solid #0b1224;
    border-radius: 14px;
    padding: 1rem;
    overflow: auto;
    font-size: 0.7rem;
    line-height: 1.5;
    color: blue;
    width: 100%;
  }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(12, 74, 110, 0), rgba(12, 74, 110, 0.35), rgba(12, 74, 110, 0));
    margin: 1.5rem 0;
  }

  @media (max-width: 640px) {
    .landing {
      padding: 2rem 1rem;
    }
    .btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>

<div class="landing">
  <div class="landing-inner">
    <div class="hero">
      <h1>Fast, fearless styling for Web Components.</h1>
      <p class="lede">
        Adapter isolates CSS automatically so your UI survives every embed, extension, and AI-generated page.
        No new syntax, no bundle weight, just custom elements that always look right.
      </p>
      <div class="cta-row">
        <a class="btn primary" href="usage/getting-started/">Getting Started</a>
        <a class="btn" href="usage/core-concepts/">Core Concepts</a>
        <a class="btn" href="usage/framework-integration/">Framework Integration</a>
      </div>
      <div class="meta">
        <span class="pill">~2 kB gzipped</span>
        <span class="pill">No build step required</span>
        <span class="pill">Works in Browser, Deno, Node</span>
      </div>
    </div>

    <div class="section">
      <div class="grid">
        <div class="card">
          <h3>CSS that never collides</h3>
          <p>Per-class and per-instance constructable style sheets keep host CSS out and your rules in.</p>
        </div>
        <div class="card">
          <h3>Drop into any stack</h3>
          <p>React, Vue, Svelte, Lit, Deno, Bun, or plain JS - Adapter is framework-agnostic and zero-dependency.</p>
        </div>
        <div class="card">
          <h3>Design-system ready</h3>
          <p>Compose tokens and variants with normal CSS. Inherit styles the same way you inherit classes.</p>
        </div>
        <div class="card">
          <h3>Built for embeds</h3>
          <p>Ship widgets, plugins, dashboards, and AI surfaces without worrying about hostile global CSS.</p>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Code that feels familiar</h2>
      <div class="grid">
        <div class="card code-block">
```ts title="TypeScript"
import { Adapter } from "https://cdn.jsdelivr.net/npm/@devcapsule/adapter/+esm";

class Button extends Adapter {}

Button.css = `
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.7rem 1.1rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--accent, #22d3ee) 60%, transparent);
  background: color-mix(in srgb, var(--accent, #22d3ee) 18%, #0b1224);
  color: #e6edff;

  &[kind="ghost"] {
    background: transparent;
  }
`;

Button.define("ui-button");
```
        </div>
        <div class="card">
          <h3>What you get</h3>
          <ul>
            <li>Encapsulated class-level CSS shared by every instance.</li>
            <li>Per-instance overrides via the `css` property or attribute.</li>
            <li>Composable helpers for tokens and variants - no new syntax.</li>
            <li>Ready-to-embed components that ignore hostile host CSS.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="divider"></div>
  </div>
</div>
