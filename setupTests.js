// Adds extra DOM matchers such as toBeInTheDocument() to Vitest.
import '@testing-library/jest-dom/vitest';

function createMemoryStorage() {
  const store = new Map();

  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(String(key), String(value));
    },
    removeItem(key) {
      store.delete(String(key));
    },
    clear() {
      store.clear();
    },
    key(index) {
      return Array.from(store.keys())[index] ?? null;
    },
    get length() {
      return store.size;
    },
  };
}

const storage = createMemoryStorage();

Object.defineProperty(window, 'localStorage', {
  value: storage,
  configurable: true,
  writable: true,
});

globalThis.localStorage = storage;
