import { execSync } from "child_process";
import { existsSync } from "fs";
import path from "path";

import { describe, test, expect, beforeAll } from "vitest";

const projectDir = path.join(__dirname, "../../bin/project");
const projectFiles = [
  ".eslintignore",
  ".eslintrc.json",
  ".gitignore",
  ".nvmrc",
  ".prettierrc.json",
  "cspell.json",
  "next.config.js",
  "package.json",
  "README.md",
  "vitest.config.ts",
  "tsconfig.json",
];

describe("pnpm copy", () => {
  beforeAll(() => {
    execSync("rm -rf ./bin");
  });
  test("Copy command should create directory in bin", async () => {
    execSync("pnpm copy");
    expect(existsSync(projectDir)).toBeTruthy();
  });

  test("Copy command should copy files in bin", async () => {
    execSync("pnpm copy");
    projectFiles.forEach((file) => {
      const filePath = path.join(projectDir, file);
      const isFileExists = existsSync(filePath);
      expect(isFileExists, `${file} Doesn't exist in bin`).toBeTruthy();
    });
  });
});
