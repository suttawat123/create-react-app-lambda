import React from "react";
import classnames from "classnames";
import { StylesInputFile, StylesInputContent } from "./styles";
import {
  IconAttach,
  IconPlus,
  IconDelete,
  word_icon,
  excel_icon,
  pdf_icon,
  loading_gif,
  IconCloseCircle,
  IconFile,
} from "../Image";
import { Text } from "../Text/index";

import { validateFileType } from "../../services/Helpers/function";
import "./index.css";

export const InputFile = ({ ...props }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  // const [isOpenPreviewUpload, setIsOpenPreviewUpload] = React.useState(false);
  const [isOpenPreviewExample, setIsOpenPreviewExample] = React.useState(false);
  // const [isFileType, setIsFileType] = React.useState(false);
  // const [allowFileExtension, setDisplayAllowFileExtension] = React.useState(
  //   null
  // );
  // const [fileName, setFileName] = React.useState(null);
  const {
    className,
    title,
    titleComponent,
    previewType,
    isAddon,
    key,
    onChange,
    name,
    id,
    imgSource,
    onRemove,
    onAddElement,
    isInvalid,
    accept = ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.gif,.png",
    imgType,
    except = "",
    typePreview,

    hiddenRemove,
  } = props;

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // const toggleModalPreviewUpload = () => {
  //   setIsOpenPreviewUpload(!isOpenPreviewUpload);
  // };

  const toggleModalPreviewExample = () => {
    setIsOpenPreviewExample(!isOpenPreviewExample);
  };

  const onValidateFile = (event) => {
    const { files } = event.target;
    let splitExceptFormat = except ? except.split(",") : [];
    let splitAccept = accept ? accept.split(",") : [];

    for (let arr in splitExceptFormat) {
      let findIndex = splitAccept.indexOf(splitExceptFormat[arr]);
      splitAccept.splice(findIndex, 1);
    }

    const parseFormatType = splitAccept.join(",");
    // setDisplayAllowFileExtension(splitAccept.join(" "));

    if (files[0]) {
      let file = files[0];

      let isValid = validateFileType(file.name, parseFormatType);

      if (isValid) {
        onChange(event);
      } else {
        onRemove(name);
        // setFileName(`${file.name}`);
        // setIsFileType(true);
      }
    }
  };

  const renderImage = () => {
    switch (imgType) {
      case "file":
        return IconFile;
      case "doc":
      case "docx":
        return word_icon;
      case "xls":
      case "xlsx":
        return excel_icon;
      case "pdf":
        return pdf_icon;
      default:
        return imgSource;
    }
  };

  return (
    <React.Fragment>
      {isAddon ? (
        <div className={"attachment-addon-other"}>
          <StylesInputFile className="attachment-addon" onClick={onAddElement}>
            <div className="attachment-addon-icon">
              <img src={IconPlus} alt="plus" />
            </div>
          </StylesInputFile>
          {title && (
            <Text.Span className="font-medium dark bold text-pre-wrap">
              {title}
            </Text.Span>
          )}
        </div>
      ) : (
        <StylesInputContent id={id} key={key} className={className}>
          {imgSource ? (
            <div
              className={classnames(className, {
                "is-image": imgSource,
                "is-invalid": isInvalid,
              })}
            >
              <img
                src={imgSource === "loading" ? loading_gif : renderImage()}
                className="is-image"
                alt="isImage"
              />

              {imgSource !== "loading" && !hiddenRemove && (
                <React.Fragment>
                  <img
                    src={typePreview ? IconCloseCircle : IconDelete}
                    className="delete"
                    alt="delete"
                    onClick={() => {
                      onRemove(name);
                    }}
                  />
                </React.Fragment>
              )}

              {imgSource !== "loading" && typePreview && (
                <React.Fragment>
                  {/* <img
                    src={icn_white_zoom}
                    alt="icn_white_zoom"
                    className="preview"
                    onClick={() => {
                      toggleModalPreviewUpload();
                    }}
                  /> */}
                </React.Fragment>
              )}
            </div>
          ) : (
            <StylesInputFile
              id={name}
              className={classnames(className, { "is-invalid": isInvalid })}
              onClick={() => {}}
            >
              <img alt="IconAttach" src={IconAttach} />
              <input
                type="file"
                id={name + "1"}
                name={name}
                onChange={onValidateFile}
                accept={".heic," + accept}
              />
            </StylesInputFile>
          )}
          {title && (
            <Text.Span className="font-medium dark bold text-pre-wrap">
              {title}
            </Text.Span>
          )}
          {titleComponent}
          {previewType && (
            <Text.Span
              className="font-medium blue bold underline pointer"
              onClick={typePreview ? toggleModalPreviewExample : toggleModal}
            >
              ตัวอย่าง
            </Text.Span>
          )}
        </StylesInputContent>
      )}

      {/* <Modal
        className="appointment-confirm-popup p-0"
        iconType="error"
        isOpen={isFileType}
        toggle={() => {
          setIsFileType(!isFileType);
        }}
      >
        <Text.Span className="font-medium blue bold mb-3">
          คำเตือนไฟล์ {title ? ": " + title : ""}
          <br />
          ไม่อนุญาติให้ทำการ Upload File : {fileName}
          <br />
          ไฟล์ที่สามารถ Upload ได้ : {allowFileExtension} เท่านั้น
        </Text.Span>
        <RoundButton
          id="bt-comfirm"
          className="btn-next mt-4"
          onClick={() => {
            setIsFileType(!isFileType);
          }}
        >
          ยืนยัน{" "}
        </RoundButton>
      </Modal> */}
    </React.Fragment>
  );
};
