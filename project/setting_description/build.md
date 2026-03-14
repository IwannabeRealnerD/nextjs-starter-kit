# Build

- This document contains information related to the build system of the project

## 1. Ignore type check and ESLint check druin build

- In the project, type checks and ESLint checks are intentionally ignored during the build process to improve build performance.
- This is achieved by setting `ignoreDuringBuilds` to true in the `next.config.js` file.

```javascript
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreDuringBuilds: true,
  },
};
```

- Type checks and ESLint checks are important for the project. However, since these checks are already implemented in pre-commit hooks, they can be ignored during the build process to improve build performance.

## 2. No .mjs files

- By adding "type": "module" to package.json, the project defaults to using ES Modules (ESM). This means user can use the standard .js file extension for all modules, and the .mjs extension is no longer required.

```jsonc
// package.json
{
  "type": "module",
}
```
