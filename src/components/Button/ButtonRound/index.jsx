import React from "react";
import classnames from "classnames";
import { RoundButtonStyle } from "./styles";

const RoundButton = ({ ...props }) => {
  const { children, className, name, onClick, id, isDisable } = props;
  return (
    <RoundButtonStyle
      id={id}
      className={classnames({ "is-disable": isDisable }, className)}
      name={name}
      onClick={onClick}
      disabled={isDisable}
    >
      {children}
    </RoundButtonStyle>
  );
};

export default RoundButton;
