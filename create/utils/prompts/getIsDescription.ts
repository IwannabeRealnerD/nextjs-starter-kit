import prompts, { Answers } from "prompts";

export const getIsDescription = async (isFull?: boolean, isMinimum?: boolean): Promise<Answers<"isDescription">> => {
  if (isFull) {
    return { isDescription: true };
  }
  if (isMinimum) {
    return {
      isDescription: false,
    };
  }
  const isDescription = await prompts({
    active: "yes",
    inactive: "no",
    initial: true,
    message: "Do you need descriptions about this project? (Recommended for first-time users of this project.)",
    name: "isDescription",
    type: "toggle",
  });

  return isDescription;
};
