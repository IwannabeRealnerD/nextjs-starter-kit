### 1. pnpm version lock

```json
{
  "name": "nextjs-starter-kit",
  "version": "0.1.0",
  "private": true,

  // added line
  "engines": {
    "pnpm": "9"
  },
```

- If you want to lock pnpm version on your project, you can add those lines.
- When you try to execute commands in the project with another pnpm version, Your command won't be executed with below error messages

![alt text](<setting_description/images/1.pnpm version lock.png>)
