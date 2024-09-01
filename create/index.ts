import prompts from "prompts";
import path from "path";
import { Command } from "commander";
import { existsSync } from "node:fs";
import packageJson from "./package.json";
import { logWithColor } from "@/utils/logWithColor";
import { getWantedFeature } from "@/utils/prompts/getWantedFeature";
import { createProject } from "@/utils/createProject";
import { getIsDescription } from "@/utils/prompts/getIsDescription";

// TODO : implement env version
// TODO : app directory

(async () => {
  const program = new Command(packageJson.name);
  program.version(packageJson.version);
  program.description(packageJson.description);
  program.helpOption("-h, --help", "Display help for command");
  program.option(
    "-m, --minimal",
    "Create minimal version of this project"
  );
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

  while (true) {
    projectName = await prompts({
      type: "text",
      name: "projectName",
      message: "What is the name of the project?",
    });

    targetLocation = path.resolve(projectName.projectName);
    if (!existsSync(targetLocation)) {
      break;
    }
    logWithColor(
      "The directory with the entered project name already exists. Please enter a different name.",
      "red"
    );
  }

  const isDescription = await getIsDescription(
    program.opts().full,
    program.opts().minimal
  );

  const wantedFeatures = await getWantedFeature(
    program.opts().full,
    program.opts().minimal
  );

  const userAnswers = Object.assign(
    {},
    projectName,
    isDescription,
    wantedFeatures
  );

  const projectLocation = await createProject(userAnswers);

  logWithColor(
    `\nProject is created successfully at ${projectLocation}\n`,
    "blue"
  );
  logWithColor(
    `\nYou can start development by running the following command.\n`,
    "blue"
  );
  logWithColor(`pnpm i\n`, "green");
  logWithColor(`pnpm dev\n`, "green");
})();
