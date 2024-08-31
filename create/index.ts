import prompts from "prompts";
import path from "node:path";
import { logWithColor } from "./utils/logWithColor";
import { createProject } from "./utils/createProject";
import { existsSync } from "fs";
import { Command } from "commander";
import packageJson from "./package.json";

// TODO : implement minimal and full options
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
  program.parse(process.argv);

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

  const isDescription = await prompts({
    type: "toggle",
    name: "isDescription",
    message:
      "Do you need descriptions about this project? (Recommended for first-time users of this project.)",
    initial: true,
    active: "yes",
    inactive: "no",
  });

  const wantedFeatures = await prompts({
    type: "multiselect",
    name: "wantedFeatures",
    message: "Pick what you want add in this project.",
    choices: [
      { title: "storybook", value: "storybook" },
      { title: "essential github actions", value: "github actions" },
      { title: "test code for util functions", value: "test code" },
    ],
  });

  const userAnswers = Object.assign(
    {},
    projectName,
    isDescription,
    wantedFeatures
  );

  const projectLocation = await createProject(userAnswers);

  logWithColor(
    `\nProject is created successfully at ${projectLocation}`,
    "blue"
  );
})();
