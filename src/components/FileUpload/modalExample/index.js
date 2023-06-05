import React, { Component } from "react";
import { Modal } from "reactstrap";
import "./index.css";

class ModalExample extends Component {
  render() {
    const { documentID } = this.props;
    switch (documentID) {
      default:
        return (
          <Modal
            isOpen={this.props.isOpen}
            toggle={this.props.toggle}
            className={"modal-lg"}
          ></Modal>
        );
    }
  }
}

export default ModalExample;
