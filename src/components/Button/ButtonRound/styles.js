import styled from "styled-components";

export const RoundButtonStyle = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none !important;
  &.btnDefault {
    width: 100%;
    height: 50px;
    border-radius: 27px;
    background-image: linear-gradient(to right, #1f5afd, #5e72e4);
    color: #fff;
    font-family: Sarabun;
    font-size: 20px;
    /* font-weight: bold; */
    font-style: normal;
    font-stretch: normal;
    line-height: 1.35;
    letter-spacing: normal;
    :hover {
      background-image: linear-gradient(to right, #1f5afd, #1f5afd);
    }
  }
  &.btn-register-system {
    width: 374px;
    height: 50px;
    border-radius: 27px;
    background-image: linear-gradient(to right, #1f5afd, #5e72e4);
  }
  &.btn-register-system:hover {
    background-image: linear-gradient(to right, #1f5afd, #1f5afd);
  }
  &.btn-back {
    width: 77px;
    height: 32px;
    background-color: transparent;
    color: #fff;
    border-radius: 100px;
    border: solid 1px #ffffff;
    text-align: left;
    font-family: Sarabun-Regular !important;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
  }

  &.btn-back-content {
    width: 100px;
    height: 40px;
    margin-bottom: 9px;
    // background-color: transparent;
    background-color: #FFFFFF;
    border-radius: 100px;
    border: solid 1px #5e72e4;
    font-family: Sarabun-Regular !important;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    z-index: 9;
    color: #1f5afd;

    :hover {
      color: #1f5afd;
      border: solid 1px #1f5afd;
      background-color: #eaf5f6;
    }

    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
      position: absolute;
      bottom: 0;
    }
  }

  &.btn-next {
    width: 100%;
    max-width: 300px;
    height: 50px;
    border-radius: 27px;
    background-image: linear-gradient(to right,#1f5afd,#5e72e4);
    color: #fff;
    font-family: Sarabun;
    font-size: 20px;
    /* font-weight: bold; */
    font-style: normal;
    font-stretch: normal;
    line-height: 1.35;
    letter-spacing: normal;
    :hover {
      background-image: linear-gradient(to right, #5e72e4, #1f5afd);
    }
  }

  &.btn-next-outline {
    width: 300px;
    height: 50px;
    border-radius: 27px;
    border: solid 1px #1f5afd;
    background-color: #ffffff;
    color: #1f5afd;
    font-family: Sarabun;
    font-size: 20px;
    /* font-weight: bold; */
    font-style: normal;
    font-stretch: normal;
    line-height: 1.35;
    letter-spacing: normal;
    :hover {
      color: #1f5afd;
      border: solid 1px #1f5afd;
      background-color: #eaf5f6;
    }
  }

  &.outline-circle {
    width: 32px;
    height: 32px;
    border: solid 1px #1f5afd;
    background-color: #ffffff;
    border-radius: 64px;
    margin-left: 50px;
    position: absolute;
    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
      // Put your IE10+-specific CSS here
      transform: translateX(-35px);
      margin-top: -15px;
    }
    :hover {
      color: #1f5afd;
      border: solid 1px #1f5afd;
      background-color: #eaf5f6;
    }
  }
  &.outline-circle > img.icn-search {
    width: 16px;
    height: 16px;
  }

  &.outline-blue {
    width: 268px;
    height: 46px;
    border-radius: 23px;
    border: solid 1px #5e72e4;
    background-color: #fff;
    font-family: Sarabun;
    font-size: 15px;
    /* font-weight: bold; */
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: #1f5afd;
    :hover {
      color: #1f5afd;
      border: solid 1px #1f5afd;
      background-color: #eaf5f6;
    }
  }

  &.outline-blue > img.icn-discount {
    width: 24px;
    height: 24px;
    margin-right: 6px;
  }

  &.btn-buy-insurance {
    width: 268px;
    height: 46px;
    border-radius: 23px;
    background-image: linear-gradient(to right, #1f5afd, #5e72e4);
    font-family: Sarabun;
    font-size: 15px;
    /* font-weight: bold; */
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
    :hover {
      background-image: linear-gradient(to right, #1f5afd, #1f5afd);
    }
  }

  &.btn-compare-insurer {
    position: absolute;
    right: 115px;
    width: 202px;
    height: 50px;
    border-radius: 27px;
    background-image: linear-gradient(to right, #1f5afd, #5e72e4);
    font-family: Sarabun;
    font-size: 20px;
    /* font-weight: bold; */
    font-style: normal;
    font-stretch: normal;
    line-height: 1.35;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
    :hover {
      background-image: linear-gradient(to right, #1f5afd, #1f5afd);
    }

    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
      top: 23px;
    }

    &.is-disable {
      background-color: #cacccf !important;
      color: #83888e !important;
      background-image: none !important;
    }
  }

  &.outline-red-dark {
    border-radius: 100px;
    border: solid 1px #721c23;
    color: #721c23;
    background-color: transparent;
    :hover {
      border: solid 1px #721c23;
      background-color: rgba(255, 255, 255, 0.4);
    }
  }

  &.tiny {
    width: 240px;
    height: 32px;
    font-size: 14px;
  }

  &.btn-small {
    width: 150px;
    height: 46px;
    font-family: Sarabun;
    font-size: 15px;
  }

  &.btn-quotation {
    width: 260px;
    height: 50px;
    border-radius: 27px;
    background-image: linear-gradient(to right, #1f5afd 0%, #5e72e4 100%);
    color: #fff;
    font-family: Sarabun;
    font-size: 20px;
    /* font-weight: bold; */
    font-style: normal;
    font-stretch: normal;
    line-height: 1.35;
    letter-spacing: normal;
    :hover {
      background-image: linear-gradient(to right, #1f5afd, #1f5afd);
    }
  }

  &.btn-buy-insurance-tiny {
    width: 150px;
    height: 32px;
    border-radius: 16px;
    background-image: linear-gradient(to right, #1f5afd 0%, #5e72e4 100%);
    font-family: Sarabun-Regular;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
    :hover {
      background-image: linear-gradient(to right, #1f5afd, #1f5afd);
    }
  }

  &.small-tiny {
    width: 150px;
    height: 32px;
    font-size: 14px;
  }

  &.btn-summary-discount-outline {
    width: 120px;
    height: 32px;
    border-radius: 16px;
    border: solid 1px #5e72e4;
    background-color: #ffffff;
    color: #1f5afd;
    font-family: Sarabun-Regular !important;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    :hover {
      color: #1f5afd;
      border: solid 1px #1f5afd;
      background-color: #eaf5f6;
    }
  }

  &.btn-scan-method {
    width: 202px;
    height: 32px;
    border-radius: 100px;
    border: solid 1px #5e72e4;
    background-color: #ffffff;
    font-family: Sarabun-Regular;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #1f5afd;
    :hover {
      color: #1f5afd;
      border: solid 1px #1f5afd;
      background-color: #eaf5f6;
    }
  }

  &.btn-outline-blue-medium {
    width: 300px;
    height: 50px;
    border-radius: 100px;
    border: solid 1px #5e72e4;
    background-color: transparent;
    font-family: Sarabun;
    font-size: 20px;
    /* font-weight: bold; */
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: #1f5afd;
    :hover {
      color: #1f5afd;
      border: solid 1px #1f5afd;
      background-color: #eaf5f6;
    }
  }

  &.btn-method-orange {
    width: 140px;
    height: 42px;
    border-radius: 21px;
    background-color: #f57224;
    font-family: Sarabun;
    font-size: 20px;
    color: #ffffff;
    cursor: default;
  }

  &.btn-medium {
    width: 170px;
    height: 46px;
    border-radius: 23px;
    background-image: linear-gradient(to right, #1f5afd, #5e72e4);
    color: #fff;
    font-family: Sarabun;
    font-size: 15px;
    :hover {
      background-image: linear-gradient(to right, #1f5afd, #1f5afd);
    }
  }

  &.btn-medium-outline {
    width: 170px;
    height: 46px;
    border-radius: 23px;
    border: solid 1px #5e72e4;
    background-color: #ffffff;
    color: #1f5afd;
    font-family: Sarabun;
    font-size: 15px;
    :hover {
      color: #1f5afd;
      border: solid 1px #1f5afd;
      background-color: #eaf5f6;
    }
  }

  &.btn-save-print-outline {
    width: 250px;
    height: 46px;
    border-radius: 27px;
    border: solid 1px #5e72e4;
    background-color: #ffffff;
    color: #1f5afd;
    font-family: Sarabun;
    font-size: 15px;
    /* font-weight: bold; */
    font-style: normal;
    font-stretch: normal;
    line-height: 1.35;
    letter-spacing: normal;
    :hover {
      color: #1f5afd;
      border: solid 1px #1f5afd;
      background-color: #eaf5f6;
    }
  }

  &.btn-back-forgot-password {
    width: 77px;
    height: 32px;
    /* margin-bottom: 9px; */
    background-color: transparent;
    border-radius: 100px;
    border: solid 1px #5e72e4;
    font-family: Sarabun-Regular !important;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    z-index: 9;
    position: absolute;
    left: 0;
    bottom: 0;
    :hover {
      color: #1f5afd;
      border: solid 1px #1f5afd;
      background-color: #eaf5f6;
    }
    @media screen and (max-width: 600px) {
      display: none;
    }
  }
  &.is-disable {
    background-color: #cacccf !important;
    color: #83888e !important;
    background-image: none !important;
  }

  &.btn-consent {
    width: 202px;
    height: 50px;
    border-radius: 27px;
    background-image: linear-gradient(to right, #1f5afd, #5e72e4);
    font-family: Sarabun;
    font-size: 20px;
    /* font-weight: bold; */
    font-style: normal;
    font-stretch: normal;
    line-height: 1.35;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
    :hover {
      background-image: linear-gradient(to right, #1f5afd, #1f5afd);
    }
  }

  &.btn-close-modal {
    width: 260px;
    height: 50px;
    border-radius: 27px;
    background-image: linear-gradient(to right, #1f5afd 0%, #5e72e4 100%);
    color: #fff;
    font-family: Sarabun;
    font-size: 20px;
    /* font-weight: bold; */
    font-style: normal;
    font-stretch: normal;
    line-height: 1.35;
    letter-spacing: normal;
    :hover {
      background-image: linear-gradient(to right, #1f5afd, #1f5afd);
    }
  }
`;
