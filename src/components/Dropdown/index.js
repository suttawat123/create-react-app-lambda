import React, { Component } from "react";
import Select, { components } from "react-select";
import { Input, Row, Col } from "reactstrap";
import { IconBlackDown, IconGreenTeal, IconGreenTealUp } from "../Image";
import "./index.css";
class Dropdown extends Component {
  render() {
    const colourStyles = {
      control: (styles, state) => ({
        ...styles,
        fontFamily: "Sarabun-Regular",
        fontWeight: "normal",
        fontStyle: "normal",
        fontSize: 16,
        height: 50,
        fontStretch: "normal",
        letterSpacing: "normal",
        backgroundColor: this.props.isDisabled ? "#cacccf" : "white",
        borderColor: this.props.invalid
          ? "#f86c6b"
          : this.props.isDisabled
          ? "#b7b6b7"
          : "#e4e7ea",
        color: "#333333",
        lineHeight: 1.5,
        boxShadow: state.isFocused ? 0 : 0,

        // '&:hover': {
        //     border: state.isFocused ? 1 : 1
        // }
      }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          fontFamily: "Sarabun-Regular",
          fontWeight: "normal",
          fontStyle: "normal",
          fontStretch: "normal",
          lineHeight: "normal",
          fontSize: 16,
          letterSpacing: "normal",
          backgroundColor: isSelected
            ? "#1f5afd"
            : isFocused
            ? "#02bfd4"
            : "#ffffff",
          color: isSelected ? "#fff" : isFocused ? "#fff" : "#333",
          borderBottom: "1px solid #e4e7ea",
        };
      },
    };

    const DropdownIndicator = (props = components.DropdownIndicator) => {
      if (props.selectProps.menuIsOpen) {
        return (
          <components.DropdownIndicator {...props}>
            <img alt="" src={IconGreenTealUp} />
          </components.DropdownIndicator>
        );
      }
      return (
        <components.DropdownIndicator {...props}>
          <img
            alt=""
            src={this.props.isDisabled ? IconBlackDown : IconGreenTeal}
          />
        </components.DropdownIndicator>
      );
    };

    if (this.props.loading === true) {
      return (
        <Input
          style={{ height: 39 }}
          placeholder={this.props.placeholder}
          id={this.props.id + "1"}
          value={
            this.props.value === undefined
              ? ""
              : this.props.value === null
              ? ""
              : this.props.value.label
          }
          className="input"
          onChange={() => {}}
        />
      );
    }

    if (this.props.disabled === true) {
      return (
        <Input
          style={{ height: 39 }}
          placeholder={this.props.placeholder}
          disabled={true}
          id={this.props.id + "1"}
          value={
            this.props.value === undefined
              ? ""
              : this.props.value === null
              ? ""
              : this.props.value.label
          }
          className="input"
          onChange={() => {}}
        />
      );
    }

    if (this.props.disabledInput === true) {
      return (
        <div className="div-disable" id={this.props.id + "1"}>
          <Row>
            <Col md={{ size: 12 }}>
              <Input
                style={{ height: 48, border: "none" }}
                placeholder={this.props.placeholder}
                disabled={true}
                id={this.props.id + "1"}
                value={
                  this.props.value === undefined
                    ? ""
                    : this.props.value === null
                    ? ""
                    : this.props.value.label
                    ? this.props.value.label
                    : ""
                }
                className="input"
                onChange={() => {}}
              />
            </Col>
            <Col md={{ size: 12 }} className="text-right">
              <img
                alt=""
                src={IconBlackDown}
                style={{ marginTop: -70, marginRight: 10 }}
              />
            </Col>
          </Row>
        </div>
      );
    }

    return (
      <Select
        {...this.props}
        inputId={this.props.id + "1"}
        components={{ IndicatorSeparator: () => null, DropdownIndicator }}
        closeMenuOnSelect={true}
        isLoading={this.props.isLoading}
        options={this.props.options}
        styles={colourStyles}
      />
    );
  }
}

export default Dropdown;
