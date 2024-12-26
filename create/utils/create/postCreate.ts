import { logWithColor } from "../logWithColor";

export const postCreate = (projectLocation: string) => {
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
