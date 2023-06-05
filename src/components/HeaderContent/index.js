import React from "react";
import { HeaderStyle } from "./styles";
import "./index.css";
import RoundButton from "../Button/ButtonRound";
import { IconGreenback } from "../Image";
import { Text } from "../Text/index";

export const HeaderContent = ({ ...props }) => {
  const { title, className, isBtnBack, onClick } = props;

  return (
    <HeaderStyle className={className}>
      {isBtnBack && (
        <RoundButton
          className="btn-back-content"
          onClick={() => {
            onClick();
          }}
        >
          <img
            alt=""
            src={IconGreenback}
            style={{ marginLeft: -5, height: "18px" }}
          />
          ย้อนกลับ
        </RoundButton>
      )}
      <div className="title-header-content">
        <Text.H1 className="title-content">{title}</Text.H1>
      </div>
    </HeaderStyle>
  );
};
