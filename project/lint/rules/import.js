export const importRules = {
  "import/no-empty-named-blocks": "error",
  "import/no-named-as-default": "error",
  "import/no-named-as-default-member": "error",
  "import/no-cycle": "error",
  "import/no-self-import": "error",
  "import/no-namespace": "error",
  "import/no-anonymous-default-export": "off",
  "import/no-extraneous-dependencies": "off",
  "import/order": [
    "error",
    {
      alphabetize: {
        caseInsensitive: true,
        order: "asc",
      },
      distinctGroup: false,
      groups: ["builtin", "external", "internal", "parent", ["index", "sibling"]],
      "newlines-between": "always",
      pathGroups: [
        {
          group: "builtin",
          pattern: "react",
          position: "before",
        },
        {
          group: "builtin",
          pattern: "next",
          position: "before",
        },
        {
          group: "builtin",
          pattern: "next/**",
          position: "before",
        },
      ],
      pathGroupsExcludedImportTypes: [],
    },
  ],
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
  // NOTE - These rules are pasted from eslint-plugin-import/recommended
  "import/no-unresolved": "error",
  "import/named": "error",
  "import/namespace": "error",
  "import/default": "error",
  "import/export": "error",
  "import/no-duplicates": "error",
};
