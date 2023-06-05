import styled from "styled-components";

export const StylesInputContent = styled.div`
  display: flex;
  flex-direction: column;

  &.incentive-data {
    width: 100%;
    margin-bottom: 20px;
    align-items: center;
  }

  &.incentive-data:nth-child(4n) {
    margin-right: 0;
  }

  div.incentive-data.is-image {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 86px;
    height: 86px;
    border-radius: 5px;
    border: solid 1px #1f5afd;
    margin-bottom: 10px;
    img.is-image {
      width: 80px;
      height: 80px;
    }

    img.delete {
      position: absolute;
      top: -10px;
      right: -10px;
      cursor: pointer;
    }
  }

  div.incentive-data.is-invalid {
    border: 1px solid #e74f47;
  }

  &.attachment {
    width: 223px;
    margin-right: 30px;
    margin-bottom: 27px;
    align-items: center;
  }

  &.attachment:nth-child(4n) {
    margin-right: 0;
  }

  &.attachment-car {
    width: 223px;
    margin-right: 30px;
    margin-bottom: 27px;
    align-items: center;
  }

  &.attachment-car:nth-child(4n) {
    margin-right: 0;
  }

  &.attachment-border-dashed {
    width: 223px;
    margin-right: 30px;
    margin-bottom: 27px;
    align-items: center;
  }

  &.attachment-border-dashed:nth-child(4n) {
    margin-right: 0;
  }

  &.attachment-border-dashed-other {
    width: 223px;
    margin-right: 30px;
    margin-bottom: 27px;
    align-items: center;
  }

  &.attachment-border-dashed-other:nth-child(4n) {
    margin-right: 0;
  }

  &.attachment-other: {
    // width: 86px;
    // height: 86px;
    width: 120px;
    height: 120px;
  }

  div.attachment.is-image {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 86px;
    height: 86px;
    border-radius: 5px;
    // border: solid 1px #1f5afd;
    border: 1px solid #42d72a;
    margin-bottom: 10px;
    img.is-image {
      width: 80px;
      height: 80px;
    }

    img.delete {
      position: absolute;
      top: -10px;
      right: -10px;
      cursor: pointer;
    }

    img.preview {
      position: absolute;
      top: 80px;
      right: 5px;
      cursor: pointer;
      width: 32px;
      height: 32px;
      padding: 6px;
      opacity: 0.5;
      background-color: #000000;
      border-radius: 100px;
    }
  }

  div.attachment.is-invalid {
    border: 1px solid #e74f47;
  }

  div.attachment-car.is-image {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 5px;
    // border: solid 1px #1f5afd;
    border: 1px solid #42d72a;
    margin-bottom: 10px;
    img.is-image {
      width: 110px;
      height: 110px;
    }

    img.delete {
      position: absolute;
      top: -10px;
      right: -10px;
      cursor: pointer;
    }

    img.preview {
      position: absolute;
      top: 80px;
      right: 5px;
      cursor: pointer;
      width: 32px;
      height: 32px;
      padding: 6px;
      opacity: 0.5;
      background-color: #000000;
      border-radius: 100px;
    }
  }

  div.attachment-car.is-invalid {
    border: 1px solid #e74f47;
  }

  div.attachment-border-dashed.is-image {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 5px;
    // border: dashed 1px #1f5afd;
    border: 1px solid #42d72a;
    margin-bottom: 10px;
    img.is-image {
      width: 110px;
      height: 110px;
    }

    img.delete {
      position: absolute;
      top: -17px;
      right: -16px;
      cursor: pointer;
    }

    img.preview {
      position: absolute;
      top: 80px;
      right: 5px;
      cursor: pointer;
      width: 32px;
      height: 32px;
      padding: 6px;
      opacity: 0.5;
      background-color: #000000;
      border-radius: 100px;
    }
  }

  div.attachment-border-dashed.is-invalid {
    border: 1px solid #e74f47;
  }

  div.attachment-border-dashed-other.is-image {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 5px;
    // border: dashed 1px #1f5afd;
    border: 1px solid #42d72a;
    margin-bottom: 10px;
    img.is-image {
      width: 110px;
      height: 110px;
    }

    img.delete {
      position: absolute;
      top: -17px;
      right: -16px;
      cursor: pointer;
    }

    img.preview {
      position: absolute;
      top: 80px;
      right: 5px;
      cursor: pointer;
      width: 32px;
      height: 32px;
      padding: 6px;
      opacity: 0.5;
      background-color: #000000;
      border-radius: 100px;
    }
  }

  div.attachment-border-dashed-other.is-invalid {
    border: 1px solid #e74f47;
  }

  div.attachment-other.is-image {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 5px;
    // border: dashed 1px #1f5afd;
    border: 1px solid #42d72a;
    margin-bottom: 10px;
    img.is-image {
      width: 110px;
      height: 110px;
    }

    img.delete {
      position: absolute;
      top: -17px;
      right: -16px;
      cursor: pointer;
    }

    img.preview {
      position: absolute;
      top: 80px;
      right: 5px;
      cursor: pointer;
      width: 32px;
      height: 32px;
      padding: 6px;
      opacity: 0.5;
      background-color: #000000;
      border-radius: 100px;
    }
  }

  div.attachment-other.is-invalid {
    border: 1px solid #e74f47;
  }

  div.attachment-other-old.is-image {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 86px;
    height: 86px;
    border-radius: 5px;
    // border: solid 1px #1f5afd;
    border: 1px solid #42d72a;
    margin-bottom: 10px;
    margin-right: 30px;
    img.is-image {
      width: 80px;
      height: 80px;
    }

    img.delete {
      position: absolute;
      top: -10px;
      right: -10px;
      cursor: pointer;
    }

    img.preview {
      position: absolute;
      top: 80px;
      right: 5px;
      cursor: pointer;
      width: 32px;
      height: 32px;
      padding: 6px;
      opacity: 0.5;
      background-color: #000000;
      border-radius: 100px;
    }
  }

  div.attachment-other-old.is-invalid {
    border: 1px solid #e74f47;
  }

  &.flex-center {
    justify-content: center;
    align-items: center;
  }
`;

export const StylesInputFile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &.attachment {
    width: 86px;
    height: 86px;
    border-radius: 5px;
    border: solid 1px #096a88;
    margin-bottom: 10px;
    cursor: pointer;

    input[type="file"] {
      position: absolute;
      width: 86px;
      height: 86px;
      opacity: 0;
      cursor: pointer;
      left: 0;
      top: 0;
    }
  }

  &.incentive-data {
    width: 86px;
    height: 86px;
    border-radius: 5px;
    border: solid 1px #1f5afd;
    margin-bottom: 10px;
    cursor: pointer;

    input[type="file"] {
      position: absolute;
      width: 86px;
      height: 86px;
      opacity: 0;
      cursor: pointer;
      left: 0;
      top: 0;
    }
  }

  &.attachment {
    width: 86px;
    height: 86px;
    border-radius: 5px;
    border: solid 1px #1f5afd;
    margin-bottom: 10px;
    cursor: pointer;

    input[type="file"] {
      position: absolute;
      width: 86px;
      height: 86px;
      opacity: 0;
      cursor: pointer;
      left: 0;
      top: 0;
    }
  }

  &.attachment-other-old {
    width: 86px;
    height: 86px;
    border-radius: 5px;
    border: solid 1px #1f5afd;
    margin-bottom: 10px;
    margin-right: 30px;
    cursor: pointer;

    input[type="file"] {
      position: absolute;
      width: 86px;
      height: 86px;
      opacity: 0;
      cursor: pointer;
      left: 0;
      top: 0;
    }
  }

  &.attachment-car {
    width: 120px;
    height: 120px;
    border-radius: 5px;
    border: solid 1px #1f5afd;
    margin-bottom: 10px;
    cursor: pointer;

    input[type="file"] {
      position: absolute;
      width: 120px;
      height: 120px;
      opacity: 0;
      cursor: pointer;
      left: 0;
      top: 0;
    }

    img {
      position: absolute;
      top: 0px;
      right: 0px;
    }
  }

  &.attachment-border-dashed {
    width: 120px;
    height: 120px;
    border-radius: 5px;
    border: dashed 1px #1f5afd;
    margin-bottom: 10px;
    cursor: pointer;
    background-color: #63c2de40 !important;

    input[type="file"] {
      position: absolute;
      width: 120px;
      height: 120px;
      opacity: 0;
      cursor: pointer;
      left: 0;
      top: 0;
    }

    img {
      position: absolute;
      top: -3px;
      right: -3px;
      width: 35px;
      height: 35px;
    }
  }

  &.attachment-border-dashed-other {
    width: 120px;
    height: 120px;
    border-radius: 5px;
    border: dashed 1px #1f5afd;
    margin-bottom: 10px;
    cursor: pointer;
    background-color: #63c2de40 !important;

    input[type="file"] {
      position: absolute;
      width: 120px;
      height: 120px;
      opacity: 0;
      cursor: pointer;
      left: 0;
      top: 0;
    }

    img {
      position: absolute;
      width: 50px;
      height: 50px;
    }
  }

  &.attachment-addon {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
      width: 86px;
      height: 86px;
    border-radius: 5px;
    border: dashed 1px #096a88;
    margin-bottom: 10px;
    cursor: pointer;
    background-color: #63c2de40 !important;
  }

  &.attachment-addon > div.attachment-addon-icon {
    width: 40px;
    height: 40px;
    background-image: linear-gradient(to right, #1f5afd 0%, #1f5afd 100%);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 20px;
    }
  }

  &.is-invalid {
    border: 1px solid #e74f47;
  }
`;
