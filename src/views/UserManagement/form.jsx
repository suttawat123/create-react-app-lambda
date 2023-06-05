import React, { Component } from "react";
import {
  Row,
  Col,
  FormGroup,
  InputGroup,
  InputGroupText,
  Input,
  InputGroupAddon,
  Label,
  FormFeedback,
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ModalError from "../../components/ModalError/index";
import LoadingFullScreen from "../../components/LoadingFullScreen";
import {
  fetchCreateUser,
  fetchDataRoleUser,
  fetchDataUserByID,
  fetchDataUserByRole,
  fetchUpdateUserByID,
} from "../../services/UserManagement/action";
import LoadingSpin from "../../components/LoadingSpin";
import RoundButton from "../../components/Button/ButtonRound";
import { HeaderContent } from "../../components/HeaderContent";
import ModalSuccess from "../../components/ModalSuccess";

class FormUserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadData: false,

      loadingFull: false,

      dataUser: {
        username: "",
        password: "",
        name: "",
        role: "admin",
      },
      dataRole: [],

      role: "",
      fileSend: null,

      uploadImageNew: false,

      isValidateUserName: false,
      isValidatePassword: false,
      isValidateName: false,
      isValidatePhone: false,

      message: "",
      isOpenModalSuccess: false,
      isOpenModalError: false,

      showPassword: false,
    };
  }

  componentDidMount = async () => {
    window.scrollTo(0, 0);

    if (this.props.action === "Edit" || this.props.action === "View") {
      this.setState({ isLoadData: true });
      await this.fetchUserByID();
    } else {
      this.setState({ isLoadData: false });
    }
  };

  componentWillUnmount = async () => {};

  fetchUserByID = async () => {
    const { fetchDataUserByID, userID } = this.props;

    let response = await fetchDataUserByID(userID);

    let { status, data } = response;

    if (status === 200) {
      this.setState({
        dataUser: data.result[0],
        isLoadData: false,
      });
    } else {
      this.setState({ isLoadData: false });
    }
  };

  onUploadFileData = async (event) => {
    const { files } = event.target;

    this.setState({
      fileSend: files[0],
      uploadImageNew: true,
      dataUser: { ...this.state.dataUser, picture: files[0] },
    });
  };

  onRemoveFileData = (name) => {
    this.setState({
      fileSend: null,
      uploadImageNew: true,
      dataUser: { ...this.state.dataUser, picture: null },
    });
  };

  validateInput = async () => {
    const { dataUser } = this.state;

    if (dataUser.username && dataUser.username !== "") {
      this.setState({
        isValidateUserName: false,
      });
    } else {
      this.setState({
        isValidateUserName: true,
      });
    }

    if (dataUser.password && dataUser.password !== "") {
      this.setState({
        isValidatePassword: false,
      });
    } else {
      this.setState({
        isValidatePassword: true,
      });
    }

    if (dataUser.name && dataUser.name !== "") {
      this.setState({
        isValidateName: false,
      });
    } else {
      this.setState({
        isValidateName: true,
      });
    }

    return;
  };

  saveData = async () => {
    await this.validateInput();

    const { isValidateUserName, isValidatePassword, isValidateName } =
      this.state;

    if (!isValidateUserName && !isValidatePassword && !isValidateName) {
      const { fetchCreateUser, fetchUpdateUserByID } = this.props;
      if (this.props.action === "Add") {
        this.setState({ loadingFull: true });

        let body = this.state.dataUser;
        body.role = "admin";

        let response = await fetchCreateUser(body);

        let { status, data } = response;

        if (status === 200) {
          this.setState({
            loadingFull: false,
            message: data.message,
            isOpenModalSuccess: true,
          });
        } else {
          this.setState({
            loadingFull: false,
            message: data.message,
            isOpenModalError: true,
          });
        }
      } else if (this.props.action === "Edit") {
        this.setState({ loadingFull: true });

        let dataUser = this.state.dataUser;
        let body = {};

        body.role = "admin";
        body.name = dataUser.name;
        body.phone = dataUser.phone;

        let response = await fetchUpdateUserByID(this.state.dataUser._id, body);

        let { status, data } = response;

        if (status === 200) {
          this.setState({
            loadingFull: false,
            message: data.message,
            isOpenModalSuccess: true,
          });
        } else {
          this.setState({
            loadingFull: false,
            message: data.message,
            isOpenModalError: true,
          });
        }
      }
    }
  };

  toggleIsOpenModalSuccess = async () => {
    this.setState({ isOpenModalSuccess: !this.state.isOpenModalSuccess });

    this.props.toggle();
  };

  toggleIsOpenModalError = async () => {
    this.setState({ isOpenModalError: !this.state.isOpenModalError });
  };

  openShowPassword = async () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { action } = this.props;

    if (this.state.LoadError) {
      return (
        <div className="animated fadeIn">
          <div className="panel">
            <div className="panel-search">{this.state.PageError}</div>
          </div>
        </div>
      );
    }

    if (this.state.isLoadData) {
      return <LoadingSpin marginTop={150} />;
    }

    return (
      <React.Fragment>
        <ModalError
          isOpen={this.state.isOpenModalError}
          toggle={this.toggleIsOpenModalError}
          errormessage={this.state.message}
        />

        <ModalSuccess
          isOpen={this.state.isOpenModalSuccess}
          toggle={this.toggleIsOpenModalSuccess}
          errormessage={this.state.message}
        />

        <div className="animated fadeIn">
          <div className="panel">
            <HeaderContent
              className="screen-header-content"
              title={
                (action === "Add"
                  ? "เพิ่ม"
                  : action === "View"
                  ? "ดู"
                  : "แก้ไข") + "ผู้ใช้งาน"
              }
              isBtnBack={true}
              onClick={this.props.toggle}
            />

            <div className="panel-search">
              <Row>
                <Col lg={6} md={6} xs={12}>
                  <FormGroup>
                    <Label htmlFor="Username" className="label">
                      ชื่อผู้ใช้
                    </Label>
                    <Input
                      autoComplete="off"
                      className="input"
                      type="text"
                      id="Username"
                      name="Username"
                      disabled={
                        action === "Edit" || action === "View" ? true : false
                      }
                      placeholder="ชื่อผู้ใช้"
                      onChange={(event) => {
                        this.setState({
                          dataUser: {
                            ...this.state.dataUser,
                            username: event.target.value,
                          },
                        });
                      }}
                      value={this.state.dataUser.username}
                      invalid={this.state.isValidateUserName}
                    />
                    <FormFeedback
                      className="errorMessage"
                      style={{
                        display: this.state.isValidateUserName
                          ? "block"
                          : "none",
                      }}
                    >
                      กรุณาระบุ ชื่อผู้ใช้
                    </FormFeedback>
                  </FormGroup>
                </Col>

                <Col lg={6} md={6} xs={12}>
                  <FormGroup>
                    <Label htmlFor="Password" className="label">
                      รหัสผ่าน
                    </Label>
                    <InputGroup>
                      <Input
                        autoComplete="off"
                        className="input"
                        type={this.state.showPassword ? "text" : "password"}
                        id="Password"
                        name="Password"
                        placeholder="รหัสผ่าน"
                        disabled={
                          action === "Edit" || action === "View" ? true : false
                        }
                        onChange={(event) => {
                          this.setState({
                            dataUser: {
                              ...this.state.dataUser,
                              password: event.target.value,
                            },
                          });
                        }}
                        value={this.state.dataUser.password}
                        invalid={this.state.isValidatePassword}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText
                          onClick={
                            this.props.action === "Add"
                              ? this.openShowPassword
                              : null
                          }
                          style={{
                            backgroundColor: "#FFFFFF",
                            cursor: "pointer",
                            borderColor: "#ced4da",
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
                        display: this.state.isValidatePassword
                          ? "block"
                          : "none",
                      }}
                    >
                      กรุณาระบุ รหัสผ่าน
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} xs={12}>
                  <FormGroup>
                    <Label htmlFor="name" className="label">
                      ชื่อ - นามสกุล
                    </Label>
                    <Input
                      autoComplete="off"
                      className="input"
                      type="text"
                      id="name"
                      name="name"
                      disabled={action === "View" ? true : false}
                      placeholder="ชื่อ - นามสกุล"
                      onChange={(event) => {
                        this.setState({
                          dataUser: {
                            ...this.state.dataUser,
                            name: event.target.value,
                          },
                        });
                      }}
                      value={this.state.dataUser.name}
                      invalid={this.state.isValidateName}
                    />
                    <FormFeedback
                      className="errorMessage"
                      style={{
                        display: this.state.isValidateName ? "block" : "none",
                      }}
                    >
                      กรุณาระบุ ชื่อ - นามสกุล
                    </FormFeedback>
                  </FormGroup>
                </Col>
                {/* <Col lg={6} md={6} xs={12}>
                  <FormGroup>
                    <Label htmlFor="Phone" className="label">
                      เบอร์โทรศัพท์
                    </Label>
                    <Input
                      autoComplete="off"
                      className="input"
                      type="text"
                      id="Phone"
                      name="Phone"
                      maxLength="10"
                      placeholder="เบอร์โทรศัพท์"
                      disabled={action === "View" ? true : false}
                      onChange={(event) => {
                        this.setState({
                          dataUser: {
                            ...this.state.dataUser,
                            phone: event.target.value.replace(/[^0-9]/gi, ""),
                          },
                        });
                      }}
                      value={this.state.dataUser.phone}
                      invalid={this.state.isValidatePhone}
                    />
                    <FormFeedback
                      className="errorMessage"
                      style={{
                        display: this.state.isValidatePhone ? "block" : "none",
                      }}
                    >
                      กรุณาระบุ เบอร์โทรศัพท์ ขึ้นต้นด้วย 0 เท่านั้น
                    </FormFeedback>
                  </FormGroup>
                </Col> */}
              </Row>

              {/* <Row>
                <Col lg={6} md={6} xs={12}>
                  <InputFile
                    key={1}
                    className="animated fadeIn incentive-data"
                    name={"file"}
                    onChange={this.onUploadFileData}
                    imgSource={
                      this.state.fileSend && this.state.uploadImageNew
                        ? URL.createObjectURL(this.state.fileSend)
                        : this.state.dataUser.picture &&
                          !this.state.uploadImageNew
                        ? END_POINT_IMAGE + this.state.dataUser.picture
                        : ""
                    }
                    imgType={this.state.file && this.state.file.fileType}
                    onRemove={this.onRemoveFileData}
                    isInvalid={this.state.isValidateFile}
                    readonly={false}
                    title="รูปภาพ (.jpg, .jpeg, .gif, .png)"
                    accept=".jpg,.jpeg,.gif,.png"
                    hiddenRemove={action === "View" ? true : false}
                  />
                </Col>
              </Row> */}

              {action !== "View" ? (
                <Row className="d-flex justify-content-center mb-15">
                  <RoundButton
                    id="btAddSearch"
                    className="btn-next"
                    onClick={() => {
                      this.saveData();
                    }}
                  >
                    บันทึกข้อมูล
                  </RoundButton>
                </Row>
              ) : null}
            </div>
          </div>

          <LoadingFullScreen loading={this.state.loadingFull} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchDataUserByID: fetchDataUserByID,
      fetchDataRoleUser: fetchDataRoleUser,
      fetchCreateUser: fetchCreateUser,
      fetchUpdateUserByID: fetchUpdateUserByID,
      fetchDataUserByRole: fetchDataUserByRole,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FormUserManagement);
