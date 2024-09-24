import { StyleRule } from "@vanilla-extract/css";

const mobile = (rule: StyleRule) => ({
  "screen and (max-width: 480px)": {
    ...rule,
  },
});
const pc = (rule: StyleRule) => ({
  "screen and (min-width: 481px)": {
    ...rule,
  },
});

interface ResponsiveStyle {
  pcStyle: StyleRule;
  mobileStyle: StyleRule;
}

export const responsiveStyle = ({ pcStyle, mobileStyle }: ResponsiveStyle) => ({
  "@media": {
    ...mobile(mobileStyle),
    ...pc(pcStyle),
  },
});
