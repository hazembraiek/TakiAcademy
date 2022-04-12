import React from "react";

type propsType = {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
};

function Card(props: propsType) {
  return (
    <div className={`card ${props.className}`} onClick={props.onClick}>
      {props.children}
    </div>
  );
}

export default Card;
