export const logWithColor = (
  message: string,
  color: "red" | "yellow" | "green" | "blue"
) => {
  const colorCodes: { [key: string]: string } = {
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    green: "\x1b[32m",
    blue: "\x1b[34m",
  };
  const resetCode = "\x1b[0m";
  console.log(`${colorCodes[color]}%s${resetCode}`, message);
};
