import { afterEach, vi } from "vitest";

// Tests must never reach the network. A rewrite that ignores the `fetch` setting fails here
// instead of calling the real API.
globalThis.fetch = async (input) => {
  throw new Error(`Unexpected network request in a test: ${String(input)}`);
};

afterEach(() => {
  vi.useRealTimers();
});
