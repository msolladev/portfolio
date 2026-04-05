// eslint.config.js
import { defineConfig } from "eslint/config";
import next from "eslint-config-next";

export default defineConfig([
  ...next,
  {
    rules: {
      semi: "error",
      "prefer-const": "error",
    },
  },
]);