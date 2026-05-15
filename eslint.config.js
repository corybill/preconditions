import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.mocha
      }
    },
    rules: {
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "no-var": "error",
      "prefer-const": "error",
      "eqeqeq": ["error", "smart"],
      "curly": ["error", "all"],
      "no-throw-literal": "warn"
    }
  },
  {
    files: ["spec/**/*.js"],
    rules: {
      "prefer-const": "off"
    }
  }
];
