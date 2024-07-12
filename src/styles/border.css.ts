import { style } from "@vanilla-extract/css";

// NOTE - button with gradient border
export const gradientButton = style({
  "::before": {
    background: `linear-gradient(90deg, "blue" 0%, "green" 100%)`,
    borderRadius: 8,
    bottom: 0,
    content: '""',
    left: 0,
    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    maskComposite: "exclude",
    padding: ".125rem",
    position: "absolute",
    right: 0,
    top: 0,
    // zIndex: -1,
  },
  backgroundColor: "#fff",
  border: `1px solid transparent`,
  borderRadius: 8,
  position: "relative",
  zIndex: 1,
});
