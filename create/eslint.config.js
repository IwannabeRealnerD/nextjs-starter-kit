import cspellPlugin from "@cspell/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import eslintPluginPrettier from "eslint-plugin-prettier";
import unicornPlugin from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

const eslintConfig = [
  {
    languageOptions: {
      parser: tseslint.parser,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.serviceworker,
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.js"],
    plugins: {
      import: importPlugin,
      import: importPlugin,
      "@typescript-eslint": tseslint.plugin,
      "@cspell": cspellPlugin,
      prettier: eslintPluginPrettier,
      unicorn: unicornPlugin,
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts"],
      },
      "import/resolver": {
        typescript: {
          extensions: [".ts", ".tsx", ".d.ts", ".css"],
        },
      },
    },
    rules: {
      "prettier/prettier": "error",
      "unicorn/no-empty-file": "error",
      "@cspell/spellchecker": [
        "error",
        {
          checkComments: false,
          autoFix: true,
          configFile: new URL("./cspell.json", import.meta.url).toString(),
        },
      ],
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "arrow-body-style": "off",
      "import/no-extraneous-dependencies": "off",
      "import/order": [
        "error",
        {
          alphabetize: {
            caseInsensitive: true,
            order: "asc",
          },
          groups: ["builtin", "external", "internal", ["index", "sibling", "parent"]],
          "newlines-between": "always",
          pathGroups: [
            {
              group: "index",
              pattern: "@/utils/**",
              position: "before",
            },
          ],
        },
      ],
      "import/prefer-default-export": "off",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              importNames: ["it"],
              message: 'Please use "test" instead of "it" from vitest.',
              name: "vitest",
            },
          ],
        },
      ],
      "no-unused-vars": "off",
      "prettier/prettier": [
        "error",
        {},
        {
          usePrettierrc: true,
        },
      ],
      "unicorn/no-empty-file": "error",
      ...eslintConfigPrettier.rules,
    },
  },
];

export default eslintConfig;
