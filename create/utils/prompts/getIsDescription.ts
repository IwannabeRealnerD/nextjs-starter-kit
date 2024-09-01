import prompts, { Answers } from "prompts";

export const getIsDescription = async (
  isFull?: boolean,
  isMinimum?: boolean
): Promise<Answers<"isDescription">> => {
  if (isFull) {
    return { isDescription: true };
  }
  if (isMinimum) {
    return {
      isDescription: false,
    };
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

  return isDescription;
};
