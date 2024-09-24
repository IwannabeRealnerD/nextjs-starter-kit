import { existsSync } from "fs";
import path from "path";

import { Command } from "commander";
import prompts from "prompts";

import { createProject } from "@/utils/createProject";
import { logWithColor } from "@/utils/logWithColor";
import { getIsDescription } from "@/utils/prompts/getIsDescription";
import { getWantedFeature } from "@/utils/prompts/getWantedFeature";

import packageJson from "./package.json";

const main = async () => {
  const program = new Command(packageJson.name);
  program.version(packageJson.version);
  program.description(packageJson.description);
  program.helpOption("-h, --help", "Display help for command");
  program.option("-m, --minimal", "Create minimal version of this project");
  program.option("-f, --full", "Create full version of this project");
  program.parse();
  logWithColor(
    "Nextjs-starter-kit is highly optimized for macOS and Visual Studio Code environments, featuring very strict linting rules.\n",
    "yellow"
  );
  logWithColor(
    "Please proceed with caution. Visit following URL for more information:\nhttps://github.com/IwannabeRealnerD/nextjs-starter-kit\n\n",
    "yellow"
  );

  let projectName;
  let targetLocation;

  do {
    projectName = await prompts({
      message: "What is the name of the project?",
      name: "projectName",
      type: "text",
    });
    targetLocation = path.resolve(projectName.projectName);
    if (existsSync(targetLocation)) {
      logWithColor("The directory with the entered project name already exists. Please enter a different name.", "red");
    }
  } while (existsSync(targetLocation));

  const isDescription = await getIsDescription(program.opts().full, program.opts().minimal);
  const wantedFeatures = await getWantedFeature(program.opts().full, program.opts().minimal);
  const userAnswers = Object.assign({}, projectName, isDescription, wantedFeatures);

  const projectLocation = await createProject(userAnswers);

  logWithColor(`\nProject is created successfully at ${projectLocation}\n`, "blue");
  logWithColor(`You can start development by running the following command.\n`, "blue");
  logWithColor(`  cd ${projectLocation}`, "green");
  logWithColor(`  pnpm i`, "green");
  logWithColor(`  pnpm dev\n`, "green");
  logWithColor(
    `\nPrepare command for husky install is intentionally omitted. please don't forget to install husky for git hooks.\n`,
    "blue"
  );
  logWithColor(`\n  pnpm husky install\n`, "green");
};

main();
