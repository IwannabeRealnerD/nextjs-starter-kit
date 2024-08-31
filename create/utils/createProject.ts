import fastGlob from "fast-glob";
import path from "node:path";
import fs from "fs/promises";
import fsPromise from "node:fs/promises";

interface createProjectArgs {
  isDescription: boolean;
  projectName: string;
  wantedFeatures: string[] | undefined;
}

export const createProject = async (arg: createProjectArgs) => {
  const sourceDir = path.join(__dirname, "../project");
  const targetDir = path.resolve(arg.projectName);
  const isStorybookWanted = arg.wantedFeatures?.includes("storybook");
  const isGithubActionsWanted =
    arg.wantedFeatures?.includes("github actions");
  const isTestCodeWanted = arg.wantedFeatures?.includes("test code");

  const copyList = ["**"];
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
      await fsPromise.mkdir(path.dirname(to), { recursive: true });
      return fsPromise.copyFile(from, to);
    })
  );
  const packageJson = path.join(targetDir, "package.json");

  if (!isStorybookWanted) {
    await fs.writeFile(
      packageJson,
      (
        await fs.readFile(packageJson, "utf8")
      ).replace(/.*storybook.*\n/g, "")
    );
  }
  await fs.writeFile(
    packageJson,
    (
      await fs.readFile(packageJson, "utf8")
    ).replace(/("name":\s*")[^"]*(")/, `$1${arg.projectName}$2`)
  );

  return targetDir;
};
