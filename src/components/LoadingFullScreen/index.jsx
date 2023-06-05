//LoadingFullScreen
import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import LoadingSpin from "../LoadingSpin/index";
import { Text } from "../Text/index";
import "./index.css";
class LoadingFullScreen extends Component {
  render() {
    return (
      <Modal
        className="loading-modal"
        isOpen={this.props.loading}
        toggle={() => {}}
        fade={false}
        style={{ height: "100%" }}
      >
        <ModalBody className="content-loading">
          <LoadingSpin marginTop={20} />
          <Text.Span className="font-large blue bold mt-3">
            กำลังดำเนินการ
          </Text.Span>
          <Text.Span className="font-medium dark bold mt-3">
            กรุณารอสักครู่
          </Text.Span>
        </ModalBody>
      </Modal>
    );
  }
}

export default LoadingFullScreen;
