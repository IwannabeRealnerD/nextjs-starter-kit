import React from "react";

import "./button.css";
import { globalOmit } from "@/utils/globalOmit";

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */

export const Button = (props: ButtonProps) => {
  const omittedProps = globalOmit(props, "primary", "size", "backgroundColor", "label");

  const mode = props.primary ? "storybook-button--primary" : "storybook-button--secondary";

  return (
    <button
      className={["storybook-button", `storybook-button--${props.size}`, mode].join(" ")}
      type="button"
      {...omittedProps}
    >
      {props.label}
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx>{`
        button {
          background-color: ${props.backgroundColor};
        }
      `}</style>
    </button>
  );
};

Button.defaultProps = {
  primary: false,
  size: "medium",
} as ButtonProps;
