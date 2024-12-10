import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import fastGlob from "fast-glob";

interface createProjectArgs {
  isDescription: boolean;
  wantedFeatures: string[] | undefined;
  projectName: string;
  routerType: "app" | "pages";
}

const __filename = fileURLToPath(import.meta.url); // 현재 파일 경로
const __dirname = dirname(__filename); // 현재 디렉토리 경로

export const createProject = async (arg: createProjectArgs) => {
  const sourceDir = path.join(__dirname, "./project");
  const targetDir = path.resolve(arg.projectName);
  const isStorybookWanted = arg.wantedFeatures?.includes("storybook");
  const isGithubActionsWanted = arg.wantedFeatures?.includes("github actions");
  const isTestCodeWanted = arg.wantedFeatures?.includes("test code");

  const copyList = ["**", "!node_modules", "!turbo", "!tsconfig.tsbuildinfo", "!next-env.d.ts"];
  if (!arg.isDescription) {
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
    (await fs.readFile(packageJson, "utf8")).replace(/("name":\s*")[^"]*(")/, `$1${arg.projectName}$2`)
  );

  if (arg.routerType === "app") {
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
  if (arg.routerType === "pages") {
    await fs.rm(path.join(targetDir, "src/app-router-resources"), { recursive: true });
  }

  return targetDir;
};
