import styled from "styled-components";

export const StylesTextContainer = styled.div`
  display: flex;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
`;
export const StylesH1 = styled.h1`
  font-family: Sarabun-Regular;
  font-size: 32px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #1f5afd;

  &.title-content {
    margin-bottom: 9px;
    margin-right: 100px;
  }
  &.orange {
    color: #f57224;
  }
`;
export const StylesH5 = styled.h5`
  font-family: Sarabun-Regular;
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.35;
  letter-spacing: normal;
  text-align: center;
  color: #1f5afd;

  &.sub-header {
    font-family: Sarabun;
    font-size: 20px;
    /* font-weight: bold; */
    font-style: normal;
    font-stretch: normal;
    line-height: 1.35;
    letter-spacing: normal;
    text-align: center;
    color: #1f5afd;
  }

  &.bold {
    font-family: Sarabun;
  }

  &.not-found {
    color: #000000;
  }
`;

export const StyleParagraph = styled.p`
  font-family: Sarabun-Regular;
  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: #333333;
  white-space: pre-wrap;
  &.bold {
    font-family: Sarabun;
  }
  &.blue {
    color: #1f5afd;
  }
  &.underline {
    text-decoration: underline;
  }

  &.orange {
    color: #f57224;
  }

  &.mb-0 {
    margin-bottom: 0px;
  }
`;

export const StyleSpan = styled.span`
  font-family: Sarabun-Regular;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
  @media not all and (min-resolution: 0.001dpcm) {
    width: 100%;
    &.flex-1 {
      flex: 1;
    }
  }
  &.pointer {
    cursor: pointer;
  }

  &.warp {
    white-space: pre;
  }

  &.text-left {
    text-align: left;
  }
  &.find-quote {
    margin-top: 10px;
  }

  &.bold {
    font-family: Sarabun;
  }

  &.blue {
    color: #1f5afd;
  }

  &.dark {
    color: #333333;
  }

  &.orange {
    color: #f57224;
  }

  &.red-orange {
    color: #e74f47;
  }

  &.red-dark {
    color: #721c23;
  }

  &.yellow {
    color: #989805;
  }

  &.white {
    color: #fff;
  }

  &.red {
    color: #e7534c !important;
  }

  &.green {
    color: #389534 !important;
  }

  &.sky {
    color: #1f5afd;
  }

  &.underline {
    text-decoration: underline;
  }

  &.font-medium {
    font-size: 18px;
  }

  &.font-extra-medium {
    font-size: 20px;
  }

  &.font-large {
    font-size: 25px;
  }

  &.font-extra-large {
    font-size: 32px;
  }

  &.font-extra-large-header {
    font-size: 24px;
    color: #ff0000;
  }

  &.label-radio {
    font-family: Sarabun;
    font-size: 15px;
    color: #333333;
    margin-left: 10px;
    line-height: 1.6;
  }

  &.line-through {
    text-decoration: line-through;
  }

  &.text-pre-wrap {
    white-space: pre-wrap;
    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
      width: 100%;
    }
  }

  &.mb-5 {
    margin-bottom: 5px;
  }

  &.mb-15 {
    margin-bottom: 15px;
  }

  &.pl-10 {
    padding-left: 10px;
  }

  &.pr-10 {
    padding-right: 10px;
  }

  &.pointer {
    cursor: pointer;
  }

  &.line-height-2 {
    line-height: 2;
  }

  &.address {
    width: 477px;
    word-break: break-word;
  }

  &.breakword {
    word-break: break-word;
  }

  &.border-radius-orange {
    width: 25px;
    height: 25px;
    background: #f57224;
    border-radius: 50px;
    margin-right: 10px;
    margin-left: 10px;
  }

  &.border-radius-orange-no-text {
    width: 5px;
    height: 5px;
    background: orange;
    border-radius: 100px;
    margin-top: 9px;
    margin-left: 20px;
    margin-right: 10px;
  }

  &.ml-34 {
    margin-left: 34px;
  }
`;
