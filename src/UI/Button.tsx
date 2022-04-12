import React from "react";

type ButtonType = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: string;
};

function Button(props: ButtonType) {
  return (
    <button
      type={props.type !== "undefined" ? "submit" : "reset"}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
