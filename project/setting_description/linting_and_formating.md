# Linting and Formatting Setup Guide

- This document contains information related to the linting and formating of the project, including the reasons for selecting libraries, configuration methods, and more.

## 1. typescript-eslint

- `@typescript-eslint/parser` is essential for enabling ESLint to parse TypeScript code, allowing for effective linting and ensuring code quality in TypeScript projects.
- `@typescript-eslint/eslint-plugin` is crucial for providing TypeScript-specific linting rules, enhancing code quality and consistency in TypeScript projects.

```bash
pnpm add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

- `recommended`, `strict`, or `stylistic` configurations can be chosen based on the project's needs.
- While `recommended` is the most basic configuration, `strict` has more stringent rules, such as enforcing consistent return types and requiring explicit accessibility modifiers.
- `stylistic` focuses on enforcing consistent code style and formatting rules, such as indentation, spacing, and naming conventions.

```json
// .eslintrc.json
{
  "extends": [
    // ...omitted
    // "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/strict",
    "plugin:@typescript-eslint/stylistic"
    // ...omitted
  ],
  "parser": "@typescript-eslint/parser"
}
```

## 2. eslint-config-airbnb

- It's easier to start with the Airbnb ESLint configuration than to start everything from scratch. Users can personalize their code rules from this configuration.

### 2-1. eslint-config-airbnb's Peer Dependency

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

### 1-2. Apply eslint-config-airbnb

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

## 3. prettier

- Prettier is added to the project to ensure consistent code formatting. By integrating Prettier with ESLint, we can automatically fix code style issues.

```bash
pnpm add -D eslint-config-prettier eslint-plugin-prettier
```

### 3-1. eslint-plugin-prettier

- In order to fix lint errors with the pnpm lint --fix command (or the format function in VS Code), prettier was not added. Instead, `eslint-plugin-prettier` was added to deal with code style issues with fixable lint errors.
- With the following settings, users can configure Prettier rules in the .eslintrc.json file.

```json
// .eslintrc.json
{
  "extends": [
    // ...omitted
    "plugin:prettier/recommended",
    // ...omitted
  ],
```

- To avoid confusion, a `.prettierrc` file is still used. With the following code, users can configure Prettier settings with `.prettierrc` file.

```json
// .eslintrc.json
"rules": {
  "prettier/prettier": [
    "error",
      {},
      {
        "usePrettierrc": true
      }
    ],
  }
}
```

### 3-2. eslint-config-prettier

- `eslint-config-prettier` is added to avoid conflicts between ESLint rules and Prettier's formatting rules.
- In order to override other eslint rules, `prettier` is added to at the end of extends property.

```json
// .eslintrc.json
  "extends": [
    // ...omitted
    // "prettier" should be the last element of the array
    "prettier"
  ],
```

### 3-3. .vscode

- In order to use ESLint as a formatter in VS Code, Following code is added to the `.vscode/settings.json` file.

```json
//.vscode/settings.json
{
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true
  }
}
```

- .js, .ts, .tsx files will be formatted with eslint, but json files will be formatted with prettier. This is because linting json files with eslint requires more settings and is not reliable.
- In 3-1, `eslint-plugin-prettier` is added to handle code style issues with fixable lint errors. Additionally, a `.prettierrc` file is used to configure Prettier settings. There is no need to worry about different formatting settings.

### 3.4 prettier-plugin-sort-json

- prettier-plugin-sort-json is added to sort json files.
- This could be done with `eslint-plugin-sort-keys-fix`, but it requires a lot of additional code and settings as described above.

```bash
pnpm add -D prettier-plugin-sort-json
```

- By default, `prettier-plugin-sort-json` will sort only top-level keys. Setting `jsonRecursiveSort` to true will sort all keys at all levels.

```json
// .prettierrc.json
{
  "jsonRecursiveSort": true,
  "plugins": ["prettier-plugin-sort-json"]
}
```

- Note that this will not sort `package.json`, `package-lock.json`, or `composer.json`. This plugin only affects the JSON parser used by Prettier. Prettier uses a different parser (`json-stringify`) for these specific files.

### 3-5. vscode eslint Setting

- In order to use ESLint as a formatter in VS Code, User needs to enable "ESLint > Format:Enable" in VS Code settings.
  ![alt text](<images/lint/2. vscode enable ESLint as a formatter.png>)

## 4. cspell

- cspell will help users to catch common spelling errors in their code.

```bash
pnpm add -D @cspell/eslint-plugin
```

- In `cspell.json`, add the following configuration to customize the spell checker. For example, The word "motorrad" is added because it's a correct word for this project but cspell does not recognize it.

```json
//cspell.json
{
  "language": "en",
  "version": "0.1",
  "words": ["khanne", "montag", "motorrad"]
}
```

> **Note for VS Code users:** If the rule is changed, it's recommended to restart the ESLint server.

## 5. eslint-plugin-boundaries

- The eslint-plugin-boundaries is added to enforce project boundaries, such as preventing imports from child directories.
- To improve readability and maintainability, the configuration has been moved from .eslintrc.json to lint-rules/boundary.json.
- To maintain modular boundaries and ensure a clear separation of concerns, the project-wide shared directory (e.g., src/constants, src/types, etc.) is restricted from importing items from the pages directory.

```bash
pnpm add -D eslint-plugin-boundaries
```

## 6. @typescript-eslint/naming-convention

- @typescript-eslint/naming-convention is added to enforce naming conventions.
- To improve readability and maintainability, the configuration has been moved from .eslintrc.json to lint-rules/naming-convention.json.
- For project-wide shared items, the naming convention requires them to start with “Global” (PascalCase or camelCase) to ensure consistency and easy identification from code base.
- No need to download anything cos it's from `@typescript-eslint`.
- There is no need to download anything additional, as it is included with @typescript-eslint.

## 7. Configuring lint command with options

- ESLint can be customized with various options to achieve certain goals.

### 7.1 -c, --config

- Use an additional configuration file for the lint command, which overrides the existing .eslintrc.\* files if there are conflicting options.
- By default, the lint command uses the .eslintrc.\* files in the current directory. If not found, it searches in the parent directories.
- In this project, this option was used to lint in pre-commit and pre-push hooks with additional rules.

### 7.2 --no-eslintrc

- Prevents the command from using the .eslintrc.\* files in the current directory.
- Using the -c option, ESLint can be configured with additional rules without being affected by the .eslintrc.\* files in the current directory.
