import { execSync } from "child_process";
import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import fastGlob from "fast-glob";

import { logWithColor } from "../logWithColor";

interface createProjectArgs {
  isDescription: boolean;
  wantedFeatures: string[] | undefined;
  projectName: string;
  routerType: "app" | "pages";
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createProject = async (projectSettings: createProjectArgs, targetDir: string) => {
  const sourceDir = path.join(__dirname, "./project");
  const isStorybookWanted = projectSettings.wantedFeatures?.includes("storybook");
  const isGithubActionsWanted = projectSettings.wantedFeatures?.includes("github actions");
  const isTestCodeWanted = projectSettings.wantedFeatures?.includes("test code");

  const copyList = ["**", "!node_modules", "!turbo", "!tsconfig.tsbuildinfo", "!next-env.d.ts"];
  if (!projectSettings.isDescription) {
    copyList.push("!setting_description/**");
  }

  if (!isStorybookWanted) {
    copyList.push("!.storybook/**", "!src/stories/**");
  }

  if (!isGithubActionsWanted) {
    copyList.push("!.github/workflows/**");
    copyList.push("!.github/labeler.yml");
  }

  if (!isTestCodeWanted) {
    copyList.push("!__test__/**");
  }

  const copiedFileNames = fastGlob.sync(copyList, {
    cwd: sourceDir,
    dot: true,
  });

  await Promise.all(
    copiedFileNames.map(async (filename) => {
      const from = path.join(sourceDir, filename);
      const to = path.join(targetDir, filename);
      await fs.mkdir(path.dirname(to), { recursive: true });
      return fs.copyFile(from, to);
    })
  );

  const packageJson = path.join(targetDir, "package.json");

  if (!isStorybookWanted) {
    const noStorybookPackageJson = (await fs.readFile(packageJson, "utf8")).replace(/.*storybook.*\n/g, "");
    await fs.writeFile(packageJson, noStorybookPackageJson);
  }

  // write project name to package.json
  await fs.writeFile(
    packageJson,
    (await fs.readFile(packageJson, "utf8")).replace(/("name":\s*")[^"]*(")/, `$1${projectSettings.projectName}$2`)
  );

  if (projectSettings.routerType === "app") {
    await fs.rm(path.join(targetDir, "src/pages"), { recursive: true });
    await fs.rename(path.join(targetDir, "app-router-resources/app"), path.join(targetDir, "src/app"));
    await fs.rm(path.join(targetDir, "lint-rules/export.json"), { recursive: true });
    await fs.rename(
      path.join(targetDir, "app-router-resources/export.json"),
      path.join(targetDir, "lint-rules/export.json")
    );
    await fs.rm(path.join(targetDir, "next.config.js"));
    await fs.rename(
      path.join(targetDir, "app-router-resources/next.config.js"),
      path.join(targetDir, "next.config.js")
    );
    await fs.rm(path.join(targetDir, "app-router-resources"), { recursive: true });
  }
  if (projectSettings.routerType === "pages") {
    await fs.rm(path.join(targetDir, "src/app-router-resources"), { recursive: true });
  }

  try {
    execSync("git init", { cwd: targetDir });
    execSync("git add .", { cwd: targetDir });
    execSync('git commit -m "Initial commit"', {
      cwd: targetDir,
    });
    logWithColor(`Git initialized successfully.`, "green");
  } catch (error) {
    logWithColor(`Error occurred while initializing git: ${error}`, "red");
    logWithColor(`Please initialize git manually.`, "red");
  }
};
