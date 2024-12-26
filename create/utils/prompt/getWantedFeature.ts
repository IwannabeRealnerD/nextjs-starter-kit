import prompts, { Answers } from "prompts";

export const getWantedFeature = async (isFull?: boolean, isMinimum?: boolean): Promise<Answers<"wantedFeatures">> => {
  if (isFull) {
    return { wantedFeatures: [] };
  }
  if (isMinimum) {
    return {
      wantedFeatures: ["storybook", "github actions", "test code"],
    };
  }

  const wantedFeatures = await prompts({
    choices: [
      { title: "storybook", value: "storybook" },
      {
        title: "essential github actions",
        value: "github actions",
      },
      {
        title: "test code for util functions",
        value: "test code",
      },
    ],
    message: "Pick what you want to add in this project.",
    name: "wantedFeatures",
    type: "multiselect",
  });
  return wantedFeatures;
};
