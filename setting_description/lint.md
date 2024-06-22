# 1. typescript-eslint

- `@typescript-eslint/parser` is essential for enabling ESLint to parse TypeScript code, allowing for effective linting and ensuring code quality in TypeScript projects.
- `@typescript-eslint/eslint-plugin` is crucial for providing TypeScript-specific linting rules, enhancing code quality and consistency in TypeScript projects.

```bash
pnpm add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

- Add below lines to `.eslintrc.json`
- `recommended`, `strict`, or `stylistic` configurations can be chosen based on the project's needs.
- While `recommended` is the most basic configuration, `strict` has more stringent rules, such as enforcing consistent return types and requiring explicit accessibility modifiers.
- `stylistic` focuses on enforcing consistent code style and formatting rules, such as indentation, spacing, and naming conventions.

```json
// .eslintrc.json
{
  "parser": "@typescript-eslint/parser",
  "extends": [
    // ...omitted
    // "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/strict",
    "plugin:@typescript-eslint/stylistic"
    // ...omitted
  ]
}
```

# 2. eslint-config-airbnb

- It's easier to start with the Airbnb ESLint configuration than to start everything from scratch. Users can personalize their code rules from this configuration.

## 2-1. eslint-config-airbnb's peer dependency

```bash
npx install-peerdeps --dev eslint-config-airbnb

# install-peerdeps v3.0.3
#$Installing peerdeps for eslint-config-airbnb@latest.
#npm install eslint-config-airbnb@19.0.4 eslint@^8.2.0 eslint-plugin-react@^7.28.0 eslint-plugin-import@^2.25.3 eslint-plugin-jsx-a11y@^6.5.1 eslint-plugin-react-hooks@^4.3.0 --save-dev
```

```bash
pnpm add -D eslint-config-airbnb@19.0.4 eslint@^8.2.0 eslint-plugin-react@^7.28.0 eslint-plugin-import@^2.25.3 eslint-plugin-jsx-a11y@^6.5.1 eslint-plugin-react-hooks@^4.3.0
```

- Install all peer dependencies in order implment eslint-config-airbnb

## 1-2. apply eslint-config-airbnb

```json
//eslintrc.json
{
  "extends": ["next/core-web-vitals", "airbnb"]
}
```

- Add "airbnb" to the extends property of your eslintrc.json file.

```bash
pnpm lint
```

- Next, run the `pnpm lint` command to verify the implementation. Don't be concerned about the numerous errors; this is expected.

![alt text](<images/lint/1. numerous errors.png>)

#3. prettier

- Prettier is added to the project to ensure consistent code formatting. By integrating Prettier with ESLint, we can automatically fix code style issues.
- eslint-config-prettier is added to avoid conflicts between ESLint rules and Prettier's formatting rules.

```bash
pnpm add -D eslint-config-prettier prettier
```

- And create .prettierrc file and add below lines - Users can customize formatting style

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 120
}
```

#4. cspell

- cspell will help users to catch common spelling errors in their code.

```bash
pnpm add -D @cspell/eslint-plugin
```

- In `cspell.json`, add the following configuration to customize the spell checker. For example, The word "motorrad" is added because it's a correct word for this project but cspell does not recognize it.

```json
//cspell.json
{
  "version": "0.1",
  "language": "en",
  "words": ["khanne", "montag", "motorrad"]
}
```

> **Note for VS Code users:** If the rule is changed, it's recommended to restart the ESLint server.
