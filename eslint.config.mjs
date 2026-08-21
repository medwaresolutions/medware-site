import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Design sources, not shipped code. These are Claude Design exports that
    // run under Babel Standalone in a browser (globals, no imports, no JSX
    // pragma) — the ported, linted versions live in src/components/hero/.
    "hero_animation/**",
    "Medware website redesign/**",
    "medware_products/**",
    "medware_products_industry/**",
  ]),
]);

export default eslintConfig;
