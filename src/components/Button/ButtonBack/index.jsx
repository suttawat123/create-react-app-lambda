import React from "react";
import { IconGreenback } from "../../Image";
import "./index.css";
const ButtonBack = (props) => {
  const goBack = () => {
    props.history.goBack();
  };

  const goTo = () => {
    props.history.push(props.url);
  };

  if (props.url) {
    return (
      <div id="btBank" onClick={goTo} className="btBack">
        <img
          alt=""
          src={IconGreenback}
          style={{
            marginLeft: -5,
            marginTop: props.marginTop ? props.marginTop : -5,
            cursor: "pointer",
          }}
        />{" "}
        <span className="LabelbtBack">กลับ</span>
      </div>
    );
  }

  return (
    <div id="btBank" onClick={goBack} className="btBack">
      <img
        alt=""
        src={IconGreenback}
        style={{
          marginLeft: -5,
          marginTop: props.marginTop ? props.marginTop : -5,
          cursor: "pointer",
        }}
      />{" "}
      <span className="LabelbtBack">กลับ</span>
    </div>
  );
};

export default ButtonBack;
