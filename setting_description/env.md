# 1. pnpm version lock

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
- When a user tries to execute commands in the project with another pnpm version, the command won't be executed and the following error messages will appear:

![alt text](<images/env/1.pnpm version lock.png>)

# 2. node version lock

```json
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
<!-- - When a user try to execute commands in the project with another node version, Your command won't be executed with below error messages -->
- When a user tries to execute commands in the project with another node version, the command won't be executed and the following error messages will appear:

![alt text](<images/env/2.node version lock.png>)