// Jest config for @tandemclub/mobile.
//
// preset: jest-expo (unchanged). The one override is testEnvironment: the
// preinstalled dependency graph has a version skew — the RN/jest-expo preset
// pins testEnvironment to jest-environment-node@29 (whose jest-mock lacks
// `clearMocksOnScope`), while jest-runtime is v30 and calls that method, so every
// suite fails to load. We point testEnvironment at the jest-30 build already in
// the store, which ships the matching jest-mock@30. (Flagged in the M1 report —
// no dependency was installed to fix this.)
const fs = require("fs");
const path = require("path");

function jest30NodeEnv() {
  try {
    const store = path.resolve(__dirname, "../../node_modules/.pnpm");
    const entry = fs.readdirSync(store).find((d) => /^jest-environment-node@30\./.test(d));
    if (entry) {
      return path.join(store, entry, "node_modules/jest-environment-node");
    }
  } catch {
    // fall through to jest's default resolution
  }
  return "node";
}

module.exports = {
  preset: "jest-expo",
  testEnvironment: jest30NodeEnv(),
  // Runs after the preset's setup (which installs the lazy winter globals).
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
