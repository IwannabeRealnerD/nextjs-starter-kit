import { StyleRule } from "@vanilla-extract/css";

export const kycMobileStyle = (rule: StyleRule) => ({
  "screen and (max-width: 480px)": {
    ...rule,
  },
});
export const kycPcStyle = (rule: StyleRule) => ({
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
    "screen and (max-width:480px)": {
      ...mobileStyle,
    },
    "screen and (min-width:481px)": {
      ...pcStyle,
    },
  },
});
