<div align="center">
  <!-- <a href="https://github.com/IwannabeRealnerD/nextjs-starter-kit">
    <img src="images/original_favicon.png" alt="Logo" width="80" height="80">
  </a> -->

  <h2 align="center">nextjs-starter-kit</h2>

  <p align="center">
    Starter kit for Next.js with useful utilities, libraries, linting, etc.
    <br />
    <a href="https://github.com/IwannabeRealnerD/nextjs-starter-kit/issues">Report Bug</a>
    ·
    <a href="https://github.com/IwannabeRealnerD/nextjs-starter-kit/issues">Request Feature</a>
  </p>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
</div>

## Explanation about implemented features

- [Environment](setting_description/Environment.md)
- [Linting_and_Formatting](setting_description/Linting and Formating.md)
  - This project uses complex and strict linting rules. Please read this document carefully to avoid potential issues or conflicts with personal preferences.
  
## Getting started in your local environment

- To get started with this project, you need to clone the reapository and install the dependency.

### Environment Setup

- nodejs - 20.10.0
- pnpm - 9.3.0
  ```sh
  corepack prepare pnpm@9.13.0 --activate
  ```
  - If your pnpm is activated by corepack, it'll automatically use the specified version.

### How to Deploy Dev Server

1. Clone repository
   ```sh
   git clone https://github.com/IwannabeRealnerD/next-starter-kit.git
   ```
2. Install pnpm dependency
   ```sh
   pnpm install --frozen-lockfile
   ```
3. Start Dev Server
   ```sh
   pnpm dev
   ```

## Upcoming features

- [ ] Implement e2e test (playwright)
- [ ] Eslint
- [ ] Enhance README
- [ ] Typescript Test
- [ ] Development DOC
- [ ] Storybook
- [ ] Different lint for git hooks - stricter

## Contact

khanne - iwannaberealnerd@gmail.com
