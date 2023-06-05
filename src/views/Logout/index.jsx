import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchLogout } from "../../services/Auth/action";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    window.scrollTo(0, 0);

    await this.Logout();
  };

  Logout = async (page) => {
    const { fetchLogout } = this.props;
    await fetchLogout();
    window.location =
      window.location.protocol + "//" + window.location.hostname;

    // window.location = window.location.href.split("/logout")[0];
  };

  render() {
    return <React.Fragment></React.Fragment>;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchLogout: fetchLogout,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
