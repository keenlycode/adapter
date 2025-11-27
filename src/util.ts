/**
 * Extension of `HTMLElement` that includes optional lifecycle callbacks.
 *
 * Notes
 * -----
 * This mirrors the Custom Elements lifecycle hooks and is useful for typing
 * components that may implement these callbacks.
 */
interface HTMLElementInterface extends HTMLElement {
  connectedCallback?(): void;
  disconnectedCallback?(): void;
}


function uuid(): string {
  const g: any = typeof globalThis !== 'undefined' ? globalThis : {};
  const c: any = g.crypto || g.msCrypto;

  // 1) Best: use built-in randomUUID if available
  if (c && typeof c.randomUUID === 'function') {
    return c.randomUUID();
  }

  // 2) Fallback: construct RFC4122 v4 using getRandomValues
  if (c && typeof c.getRandomValues === 'function') {
    const bytes = new Uint8Array(16);
    c.getRandomValues(bytes);

    // Per RFC 4122: set version and variant bits
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10x

    const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
    return (
      hex.slice(0, 8) + '-' +
      hex.slice(8, 12) + '-' +
      hex.slice(12, 16) + '-' +
      hex.slice(16, 20) + '-' +
      hex.slice(20)
    );
  }

  // 3) Last resort (non-crypto): timestamp + random + counter
  // Not cryptographically secure; avoids tight-loop sleeps and reduces collisions.
  const counter = (uuid as any)._ctr = ((uuid as any)._ctr || 0) + 1;
  const time = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 10);
  return `${time}-${rand}-${counter.toString(36)}`;
}



export {
  type HTMLElementInterface,
  // sleepSync,
  uuid
}
