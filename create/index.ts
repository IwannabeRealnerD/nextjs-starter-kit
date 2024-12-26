import path from "path";

import { createProject } from "@/utils/create/createProject";
import { postCreate } from "@/utils/create/postCreate";
import { getUserOptions } from "@/utils/prompt";

const main = async () => {
  const userAnswers = await getUserOptions();

  const targetDir = path.resolve(userAnswers.projectName);
  await createProject(userAnswers, targetDir);

  postCreate(targetDir);
};

main();
