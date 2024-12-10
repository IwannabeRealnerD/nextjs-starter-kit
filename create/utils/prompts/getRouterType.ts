import prompts, { Answers } from "prompts";

export const getRouterType = async (isFull?: boolean, isMinimum?: boolean): Promise<Answers<"routerType">> => {
  if (isFull || isMinimum) {
    return { routerType: "app" };
  }

  const routerType = await prompts({
    choices: [
      { title: "App Router", value: "app" },
      { title: "Pages Router", value: "pages" },
    ],
    message: "Select the router type for this project.",
    name: "routerType",
    type: "select",
  });
  return routerType;
};
