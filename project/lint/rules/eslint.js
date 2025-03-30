import js from "@eslint/js";

export const eslintRules = {
  ...js.configs.recommended.rules,
  "object-shorthand": ["error", "always"],
  "no-unused-vars": "off",
  curly: "error",
  "arrow-body-style": "off",
};
