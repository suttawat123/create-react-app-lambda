//หน้าจอ Login
import React, { Component } from "react";
import {
  Card,
  CardBody,
  FormGroup,
  FormFeedback,
  Col,
  Container,
  Input,
  Row,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./index.css";
import { LogoMain } from "../../components/Image";
import { fetchLogin } from "../../services/Auth/action";
import ModalError from "../../components/ModalError/index";
import RoundButton from "../../components/Button/ButtonRound/index";
import LoadingSpin from "../../components/LoadingSpin/index";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      isLogin: false,
      isLoadLogout: false,

      username: "",
      password: "",

      validateUsername: false,
      validatePassword: false,

      isModalError: false,
      errormessage: "",
    };
  }

  componentDidMount = async () => {};

  validateInput = async () => {
    const { username, password } = this.state;
    if (username === "") {
      this.setState({ validateUsername: true });
    } else {
      this.setState({ validateUsername: false });
    }
    if (password === "") {
      this.setState({ validatePassword: true });
    } else {
      this.setState({ validatePassword: false });
    }

    return;
  };

  Login = async () => {
    await this.validateInput();

    const { fetchLogin } = this.props;
    const { validateUsername, validatePassword } = this.state;

    if (!(validateUsername && validatePassword)) {
      this.setState({ isLogin: true });

      await fetchLogin({
        username: this.state.username,
        password: this.state.password,
      })
        .then(async (res) => {
          // let { data } = res;
          // this.props.history.push("/");
          window.location.reload();
        })
        .catch(async (error) => {
          if (error.response) {
            this.setState({
              isLogin: false,
              isModalError: true,
              errormessage: error.response.data.message,
            });
          } else {
            this.setState({
              isLogin: false,
              isModalError: true,
              errormessage: error.message,
            });
          }
        });
    } else {
      if (validateUsername) {
        let username = document.getElementById("username");
        if (username !== undefined) {
          username.focus();
        }
      } else if (validatePassword) {
        let password = document.getElementById("password");
        if (password !== undefined) {
          password.focus();
        }
      }
    }
  };

  openModalError = () => {
    this.setState({ isModalError: !this.state.isModalError });
  };

  ShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  BoxLogin = () => {
    if (this.state.isLogin) {
      return (
        <center>
          <LoadingSpin />
        </center>
      );
    } else {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col md={12} sm={12} xl={12}>
              <RoundButton
                id="btnLogin"
                name="btnLogin"
                onClick={this.Login}
                className="btnDefault mt-10 mb-10"
              >
                เข้าสู่ระบบ
              </RoundButton>
            </Col>
          </Row>
        </div>
      );
    }
  };

  componentWillUnmount() {}

  render() {
    const {
      username,
      password,
      validateUsername,
      validatePassword,
    } = this.state;

    return (
      <React.Fragment>
        <ModalError
          isOpen={this.state.isModalError}
          toggle={this.openModalError}
          errormessage={this.state.errormessage}
        />

        <div className="bg-page">
          <div className="app align-items-center animated fadeIn boxLogin">
            <Container className="boxContainer">
              <Card className="boxCardLogin">
                <div className="text-center">
                  <img alt="" src={LogoMain} className="logo" />
                </div>
                <CardBody className="boxCardBody">
                  <Row>
                    <Col md={12}>
                      <FormGroup>
                        <Label htmlFor="username" className="username">
                          บัญชีผู้ใช้
                        </Label>
                        <Input
                          type="text"
                          id="username"
                          name="username"
                          autoFocus
                          disabled={this.state.isLogin}
                          invalid={validateUsername}
                          className="input"
                          onChange={(event) => {
                            this.setState({
                              username: event.target.value.replace(
                                /[^A-Za-z0-9]/gi,
                                ""
                              ),
                            });
                          }}
                          value={username}
                          maxLength="15"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              let password = document.getElementById(
                                "password"
                              );
                              if (password !== undefined) {
                                password.focus();
                              }
                            }
                          }}
                        />
                        <FormFeedback
                          className="errorMessage"
                          style={{
                            display:
                              validateUsername === true ? "block" : "none",
                          }}
                        >
                          กรุณาระบุบัญชีผู้ใช้
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <FormGroup>
                        <Label htmlFor="password" className="password">
                          รหัสผ่าน
                        </Label>
                        <InputGroup>
                          <Input
                            type={this.state.showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            disabled={this.state.isLogin}
                            className="input"
                            style={{ borderRightWidth: 0 }}
                            onChange={(event) => {
                              let password = event.target.value.replace(
                                /[^A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/gi,
                                ""
                              );

                              this.setState({
                                password: password,
                              });
                            }}
                            value={password}
                            invalid={validatePassword}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                this.Login();
                              }
                            }}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText
                              onClick={this.ShowPassword}
                              style={{
                                backgroundColor: "#fff",
                                cursor: "pointer",
                                borderColor: validatePassword
                                  ? "#f86c6b"
                                  : "#e4e7ea",
                              }}
                            >
                              <i
                                className={
                                  this.state.showPassword
                                    ? "fa fa-eye"
                                    : "fa fa-eye-slash"
                                }
                                style={{ fontSize: 18 }}
                              ></i>
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                        <FormFeedback
                          className="errorMessage"
                          style={{
                            display: validatePassword ? "block" : "none",
                          }}
                        >
                          กรุณาระบุรหัสผ่าน
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>

                  {this.BoxLogin()}
                </CardBody>
              </Card>
            </Container>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  // Routes: state.Routes,
  // UserLogin: state.User,
  // AppVersion: state.AppVersion,
  // currentAccess: state.currentAccess,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchLogin: fetchLogin,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
