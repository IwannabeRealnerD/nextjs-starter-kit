# Environment

- This document provides a setting guide for the development environment. It includes instructions on locking specific versions of pnpm and Node.js, using corepack for version management, and utilizing nvm for Node.js version control.

## 1. pnpm version lock

```json
// package.json
{
  "name": "nextjs-starter-kit",
  "version": "0.1.0",
  "private": true,

  // added line
  "engines": {
    "pnpm": "9"
  },
```

- When a user tries to execute commands in the project with another pnpm version, the command won't be executed and the following error messages will appear:

![alt text](<images/env/1.pnpm version lock.png>)

### 1-1. for corepack users

```bash
corepack use pnpm@latest
```

```json
  "packageManager": "pnpm@9.3.0+sha256.e1f9e8d1a16607a46dd3c158b5f7a7dc7945501d1c6222d454d63d033d1d918f"
```

- For users who activated pnpm with [corepack](https://nodejs.org/api/corepack.html), this command will make it easier to switch between projects with different pnpm versions. The designated pnpm version will be automatically activated.

## 2. node version lock

```json
// package.json
{
  "name": "nextjs-starter-kit",
  "version": "0.1.0",
  "private": true,
  "engines": {
    "pnpm": "9",
    // added line
    "node": "20"
  },
```

- When a user tries to execute commands in the project with another node version, the command won't be executed and the following error messages will appear:

![alt text](<images/env/2.node version lock.png>)

## 3. nvm file

- If a user uses nvm, they can manage the Node.js version easily with the `.nvmrc` file.

```bash
nvm use
```
