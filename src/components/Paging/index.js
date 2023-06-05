import React, { Component } from "react";
import classnames from "classnames";
import {} from "reactstrap";
import "./index.css";

class Paging extends Component {
  onPageClick = (PageNo) => {
    this.props.onPageClick(PageNo);
  };

  onPageNext = () => {
    let PageNo = this.props.PageActive + 1;
    this.props.onPageClick(PageNo);
  };

  onPageBack = () => {
    if (this.props.PageActive > 1) {
      let PageNo = this.props.PageActive - 1;
      this.props.onPageClick(PageNo);
    }
  };

  componentDidMount = () => {};

  render() {
    if (this.props.IsLoading) {
      return <div></div>;
    }
    const { Total, PageSize, PageActive } = this.props;
    if (this.props.Total === 0 && PageActive === 1) {
      return <div></div>;
    }

    let page = [];
    let totalPage = Total / PageSize;
    if (Total % PageSize > 0) {
      totalPage += 1;
    }
    let l = 1;
    let i = PageActive - 1;
    if (PageActive === totalPage) {
      i = totalPage - 2;
    } else if (PageActive === 1) {
      i = 1;
    }

    for (; i <= totalPage; i++) {
      if (i > 0) {
        page.push(i);

        l += 1;
        if (l > 3) {
          break;
        }
      }
    }

    return (
      <div
        className={classnames(this.props.className, "BoxPage animated fadeIn")}
      >
        <div
          id="btPageBack"
          style={{ display: this.props.PageActive === 1 ? "none" : "flex" }}
          onClick={() => {
            this.onPageBack();
          }}
          className="Back"
        >
          ก่อนหน้า
        </div>
        <div
          className="Back"
          style={{ display: this.props.PageActive >= 3 ? "flex" : "none" }}
        >
          ...
        </div>

        {page.map((p, id) => {
          return (
            <button
              key={id}
              id={"btPage" + (id + 1)}
              onClick={() => {
                this.onPageClick(p);
              }}
              className={this.props.PageActive === p ? "PageActive" : "Page"}
            >
              {p}
            </button>
          );
        })}

        <div
          className="Next"
          style={{
            display: this.props.PageActive <= totalPage - 2 ? "flex" : "none",
          }}
        >
          ...
        </div>
        <div
          id="btPageNext"
          onClick={() => {
            if (this.props.PageActive <= totalPage - 1) {
              this.onPageNext();
            }
          }}
          className="Next"
          style={{
            display: this.props.PageActive <= totalPage - 1 ? "flex" : "none",
          }}
        >
          ถัดไป
        </div>

        <span className="Total">ทั้งหมด {Total} รายการ</span>
      </div>
    );
  }
}

export default Paging;
