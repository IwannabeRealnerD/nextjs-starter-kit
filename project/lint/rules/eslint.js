import js from "@eslint/js";

export const eslintRules = {
  "no-unused-vars": "off",
  "arrow-body-style": "off",
  ...js.configs.recommended.rules,
};
