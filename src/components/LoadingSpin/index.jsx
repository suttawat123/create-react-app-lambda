//LoadingSpin
import React, { Component } from "react";
import { loading_gif } from "../Image";
import "./index.css";
class LoadingSpin extends Component {
  render() {
    let marginTop = 0;
    marginTop = this.props.marginTop ? this.props.marginTop : marginTop;

    return (
      <center>
        <div className="animated fadeIn" style={{ marginTop: marginTop }}>
          <img alt="" className="loading" src={loading_gif} />
        </div>
      </center>
    );
  }
}

export default LoadingSpin;
