import js from "@eslint/js";

export const eslintRules = {
  ...js.configs.recommended.rules,
  "object-shorthand": ["error", "always"],
  "no-unused-vars": "off",
  "arrow-body-style": "off",
  "no-redeclare": "off",
  "no-console": "warn",
  "no-restricted-syntax": [
    "error",
    {
      selector: "UnaryExpression[operator='!'][argument.type='UnaryExpression'][argument.operator='!']",
      message: "Use 'Boolean(value)' instead of '!!value' for explicit boolean casting.",
    },
  ],
};
