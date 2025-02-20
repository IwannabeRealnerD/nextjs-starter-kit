import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import fastGlob from "fast-glob";

interface createProjectArgs {
  isDescription: boolean;
  wantedFeatures: string[] | undefined;
  projectName: string;
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
};
