//Component upload ไฟล์เอกสาร
import React, { Component } from "react";
import { Label } from "reactstrap";
import classnames from "classnames";
import {
  IconAttach,
  IconAttachDisable,
  IconDelete,
  pdf,
  loading_gif,
} from "../Image";
import "./index.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setDocument,
  removeDocument,
  setDocumentTypeId,
} from "../../../services/AgentDocument/actions";
import ModalExample from "./modalExample";
import { ValidateFileType, FileType } from "../../Helpers";
import ModalError from "../ModalError";

const Image = (props) => {
  let filetype = FileType(props.filename);
  if (filetype === "pdf") {
    return (
      <React.Fragment>
        <img
          alt=""
          src={pdf}
          style={{ maxHeight: 80, padding: 5, maxWidth: 80 }}
        />
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <img
        alt=""
        src={props.filecontent ? props.filecontent : loading_gif}
        style={{ maxHeight: 80, padding: 5, maxWidth: 80 }}
      />
    </React.Fragment>
  );
};

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsmodalExample: false, // state ใช้เปิด ปิด modal
      documentID: "00", //state ใช้เก็บหมายเลขเอกสาร
      IsError: false,
    };
  }

  //ปิด เปิด modal ตัวอย่าง
  ModalExample = () => {
    this.setState({
      IsmodalExample: !this.state.IsmodalExample,
    });
  };

  //functon Remove
  Remove = (documentID) => {
    const { removeDocument, setDocumentTypeId } = this.props;
    setDocumentTypeId(documentID);
    removeDocument(documentID);
  };

  //open select file
  Upload = (event, documentID) => {
    const { setDocumentTypeId } = this.props;
    setDocumentTypeId(documentID);
    this.handleFile(event, documentID);
    // document.getElementById("fileUpload").click();
  };

  //function select file
  handleFile = (e, documentID) => {
    const { setDocument } = this.props;
    const file = e.target.files[0];
    if (file) {
      const { Document } = this.props.Document;
      let document = Document.filter((x) => x.documentid === documentID)[0];
      let isValid = ValidateFileType(file.name, document.extension + ",.jpeg");
      if (isValid) {
        setDocument(file, documentID);
      } else {
        this.setState({ IsError: false });
        setTimeout(() => {
          this.setState({ IsError: true });
        }, 500);
      }
    }
  };

  render() {
    const { Document } = this.props.Document;
    const { documentID } = this.props;
    let document = Document.filter((x) => x.documentid === documentID)[0];
    if (document === undefined) {
      document = {};
    }
    const { disabled } = this.props;
    //ไม่ให้อัพโหลดไฟล์
    if (disabled === true) {
      return (
        <div className={classnames(this.props.className, "content-file")}>
          <div
            id={"documentID" + this.props.documentID}
            name={"documentID" + this.props.documentID}
            className="file-BorderBlockUpload"
          >
            <img alt="" src={IconAttachDisable} style={{ width: 40 }} />
          </div>
          <Label className="labelBlock">
            {!this.props.disableLabel && document.documentname}
          </Label>
          <Label className="buttonBlockExample" onClick={() => {}}>
            ตัวอย่าง
          </Label>
          <ModalExample
            documentID={documentID}
            isOpen={this.state.IsmodalExample}
            toggle={this.ModalExample}
            document={document}
          />
        </div>
      );
    }

    //ไม่พบเอกสาร
    if (document.documentname === undefined) {
      document = {};
      return <div></div>;
    } else {
      //พบเอกสารและอัพโหลดไฟล์เอกสารแล้ว
      const { error } = this.props;
      const { AgentDocument } = this.props.AgentDocument;
      let file = AgentDocument.filter((x) => x.documentid === documentID)[0];

      if (file === undefined) {
        file = {};
      }
      if (file.hastfile === true) {
        return (
          <div className={classnames(this.props.className, "content-file")}>
            <div
              id={"documentID" + this.props.documentID}
              name={"documentID" + this.props.documentID}
              className={
                error
                  ? file.filecontent
                    ? "file-BorderUpload"
                    : "file-BorderUpload-error"
                  : "file-BorderUpload"
              }
            >
              {file.filecontent && (
                <img
                  alt="IconDelete"
                  className="icon-delete"
                  src={IconDelete}
                  onClick={() => {
                    this.Remove(documentID);
                  }}
                />
              )}
              <Image filename={file.filename} filecontent={file.filecontent} />
            </div>
            <Label className="label-upload">
              {!this.props.disableLabel && document.documentname}
            </Label>
            <Label
              color="link"
              className="buttonExample"
              onClick={this.ModalExample}
            >
              ตัวอย่าง
            </Label>
            <ModalExample
              documentID={documentID}
              isOpen={this.state.IsmodalExample}
              toggle={this.ModalExample}
              document={document}
            />
          </div>
        );
      } else {
        //พบเอกสารและยังไม่อัพโหลดไฟล์เอกสาร
        const { error } = this.props;
        return (
          <div className={classnames(this.props.className, "content-file")}>
            <input
              type="file"
              id={"documentID" + this.props.documentID}
              name="fileUpload"
              onChange={(event) => {
                this.Upload(event, documentID);
                // this.handleFile(event)
              }}
              className="input-file"
              accept={".heic," + document.extension}
            />
            <div
              name={"documentID" + this.props.documentID}
              className={
                error ? "file-BorderUpload-error" : "file-BorderUpload"
              }
              onClick={() => {}}
            >
              <img src={IconAttach} alt="IconAttach" style={{ width: 40 }} />
            </div>
            <Label className="label-upload">
              {!this.props.disableLabel && document.documentname}
            </Label>
            <Label
              color="link"
              className="buttonExample"
              onClick={this.ModalExample}
            >
              ตัวอย่าง
            </Label>
            <ModalError
              isOpen={this.state.IsError}
              Message="คุณเลือกรูปแบบไฟล์ไม่ถูกต้อง"
              toggle={() => {
                this.setState({ IsError: false });
              }}
            />
            <ModalExample
              documentID={documentID}
              isOpen={this.state.IsmodalExample}
              toggle={this.ModalExample}
              document={document}
            />
          </div>
        );
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    Document: state.Document,
    AgentDocument: state.AgentDocument,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setDocument: setDocument,
      removeDocument: removeDocument,
      setDocumentTypeId: setDocumentTypeId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
