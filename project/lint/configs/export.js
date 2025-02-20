/** @type {import("eslint").Linter.Config[]} */
export const exportConfigs = [
  {
    files: ["src/**/*.page.tsx"],
    rules: { "import/no-named-export": "error" },
  },
  {
    files: ["src/**/*.tsx", "src/**/*.ts"],
    ignores: ["**/*.stories.ts", "src/**/*.page.tsx"],
    rules: { "import/no-default-export": "error" },
  },
];
