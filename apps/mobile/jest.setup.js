// Eagerly materialize expo's lazily-installed WinterCG globals.
//
// expo's winter runtime installs these as lazy getters that `require()` their
// implementation on first access. Under jest 30, if that first access happens
// during between-test teardown (e.g. jest touches `URL`/`structuredClone` while
// serializing), jest throws "trying to require a file outside of the scope of
// the test code". Touching each one here (in test scope) replaces the getter
// with a plain value, so it's never lazily required later. (Preinstalled
// dependency skew — flagged in the M1 report; nothing was installed to fix it.)
[
  "TextDecoder",
  "TextDecoderStream",
  "TextEncoderStream",
  "URL",
  "URLSearchParams",
  "DOMException",
  "structuredClone",
  "fetch",
  "__ExpoImportMetaRegistry",
].forEach((name) => {
  try {
    // eslint-disable-next-line no-unused-expressions
    globalThis[name];
  } catch {
    // ignore — not every global exists in every environment
  }
});
