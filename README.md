<div align="center">
 
  <h2 align="center">nextjs-starter-kit</h2>

  <p align="center">
    Monorepo porject for nextjs-starter-kit with create-nextjs-starter-kit command.
    <br />
    <a href="https://github.com/IwannabeRealnerD/nextjs-starter-kit/issues">Report Bug</a>
    ·
    <a href="https://github.com/IwannabeRealnerD/nextjs-starter-kit/issues">Request Feature</a>
  </p>
</div>

<div align="center">
  <h3>nextjs-starter-kit</h3>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=Vitest&logoColor=white">
  <img src="https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=Storybook&logoColor=white">
  <img src="https://img.shields.io/badge/Testing Library-E33332?style=for-the-badge&logo=Testing Library&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub actions-2088FF?style=for-the-badge&logo=GitHub actions&logoColor=white">
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white">
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white">
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white">
</div>
<div align="center">
  <h3>create-nextjs-starter-kit</h3>
  <img src="https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=Vitest&logoColor=white">
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"><img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white">
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white">
</div>

## Introduction

- This monorepo project includes the `nextjs-starter-kit` and create command for `create-nextjs-starter-kit`.
- It uses pnpm as primary package manager and Turbo as monorepo manager.
- The create-nextjs-starter-kit project is located in the [./create](./create) directory, and the nextjs-starter-kit project is located in the [./project](./project) directory.

### nextjs-starter-kit

> `nextjs-starter-kit` is a starter kit for Next.js applications. It provides essential tools, libraries, and configurations to help users quickly set up and develop their Next.js projects.

### create-nextjs-starter-kit

> `create-nextjs-starter-kit` is a command-line tool that allows users to quickly create a new nextjs-starter-kit project with a variety of options and best practices already set up.

## Before using this project

- `nextjs-starter-kit` uses complex and strict linting rules. Please read [this document](./project/setting_description/linting_and_formatting.md) carefully to avoid potential issues or conflicts with personal preferences.
  - It also has highly opinionated linting rules, which can be customized to match personal preferences.
- `nextjs-starter-kit` is highly optimized for mac and vscode environment. Please use it in the same environment to avoid unexpected issues.

## Explanation about implemented features

- [environment](./project/setting_description/environment.md)
- [linting and formatting](./project/setting_description/linting_and_formatting.md)
- [github actions](./project/setting_description/github_actions.md)
- [test](./project/setting_description/test.md)
- [libraries](./project/setting_description/libraries.md)
- [build](./project/setting_description/build.md)

## How to start project

- clone this repository
  ```sh
  git clone https://github.com/IwannabeRealnerD/nextjs-starter-kit.git
  ```
- install pnpm dependency
  ```sh
  pnpm install
  ```
- start dev server
  ```sh
  pnpm dev
  ```
## Upcoming features

- [ ] Implement e2e test (playwright)
- [ ] New Eslint format
- [ ] make create-next-start command

## Contact

khanne - iwannaberealnerd@gmail.com
