// eslint.config.js
import { FlatCompat } from "eslint-define-config/compat";

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Extendemos las reglas recomendadas de Next.js
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      // Reglas personalizadas opcionales
      "no-console": "warn",
      "react/react-in-jsx-scope": "off"
    },
  },
];