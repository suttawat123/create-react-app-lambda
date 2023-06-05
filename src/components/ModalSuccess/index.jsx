import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import { Text } from "../Text/index";
import "./index.css";
import RoundButton from "../Button/ButtonRound/index";
import { IconSuccess } from "../Image";

class ModalSuccess extends Component {
  render() {
    return (
      <Modal
        className="loading-modal"
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
      >
        <ModalBody className="container-modal-content">
          <div className="div-icon">
            <img alt="IconSuccess" src={IconSuccess} />
          </div>
          <Text.Span className="font-large blue bold mt-3 mb-15 text-pre-wrap">
            {this.props.errormessage}
          </Text.Span>
          <RoundButton
            className="btn-next mt-4 mb-4"
            onClick={this.props.toggle}
          >
            ปิด
          </RoundButton>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalSuccess;
