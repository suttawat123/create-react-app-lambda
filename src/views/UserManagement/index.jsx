import React, { Component } from "react";
import {
  Row,
  Col,
  FormGroup,
  InputGroup,
  InputGroupText,
  Input,
  InputGroupAddon,
  Table,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ModalError from "../../components/ModalError/index";
import LoadingFullScreen from "../../components/LoadingFullScreen";
import {
  fetchDataUser,
  fetchDeleteUserByID,
  fetchResetPassword,
  setUserID,
} from "../../services/UserManagement/action";
import FormUserManagement from "./form";
import LoadingSpin from "../../components/LoadingSpin";
import RoundButton from "../../components/Button/ButtonRound";
import { IconGreenTealSearch } from "../../components/Image";
import moment from "moment";
import ModalSuccess from "../../components/ModalSuccess";
import Paging from "../../components/Paging";
import { PAGE_LIMIT } from "../../config/base";
import Swal from "sweetalert2";
import { Text } from "../../components/Text";

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadData: false,
      loadingFull: false,

      dataUser: [],
      dataUserTotal: 0,
      page: 1,

      isOpenForm: false,
      userID: null,
      action: null,
      message: "",
      isOpenModalSuccess: false,
      isOpenModalError: false,

      role: "",
    };
  }

  componentDidMount = async () => {
    window.scrollTo(0, 0);

    if (this.props.UserManagement.userID) {
      this.clickOpenFormPage(this.props.UserManagement.userID);
    } else {
      await this.fetchUser(1);
    }
  };

  componentWillUnmount = async () => {
    const { setUserID } = this.props;
    await setUserID("");
  };

  toggleIsOpenForm = async () => {
    this.setState({ isOpenForm: !this.state.isOpenForm });
    if (this.state.isOpenForm) {
      this.setState({ page: 1 });
      const { setUserID } = this.props;
      await setUserID("");
      await this.fetchUser(1);
    }
  };

  toggleIsOpenModalSuccess = async () => {
    this.setState({ isOpenModalSuccess: !this.state.isOpenModalSuccess });
  };

  toggleIsOpenModalError = async () => {
    this.setState({ isOpenModalError: !this.state.isOpenModalError });
  };

  Search = async () => {};

  fetchUser = async (page) => {
    this.setState({ isLoadData: true, page: page });
    const { fetchDataUser } = this.props;

    let response = await fetchDataUser(page, this.state.role);

    let { status, data } = response;

    if (status === 200) {
      this.setState({
        dataUser: data.result,
        dataUserTotal: data.total,
        isLoadData: false,
      });
    } else {
      this.setState({
        dataUser: [],
        dataUserTotal: 0,
        isLoadData: false,
      });
    }
  };

  resetPassword = async (_id) => {
    Swal.fire({
      title: "",
      text: "ต้องการรีเซ็ตรหัสผ่านใหม่ ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่ใช่",
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.setState({ loadingFull: true });
        const { fetchResetPassword } = this.props;

        let response = await fetchResetPassword(_id);

        let { status, data } = response;

        if (status === 200) {
          this.setState({
            loadingFull: false,
            message: `รหัสผ่านใหม่คือ ${data.result.new_password}`,
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
    });
  };

  clickOpenFormPage = (_id) => {
    this.setState({
      isOpenForm: true,
      userID: _id,
      action: "Edit",
    });
  };

  deleteUserByID = async (_id) => {
    Swal.fire({
      title: "",
      text: "ต้องการลบข้อมูล ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่ใช่",
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.setState({ loadingFull: true });
        const { fetchDeleteUserByID } = this.props;

        let response = await fetchDeleteUserByID(_id);

        let { status, data } = response;

        if (status === 200) {
          this.setState({
            loadingFull: false,
            message: data.message,
            isOpenModalSuccess: true,
          });
          await this.fetchUser(1);
        } else {
          this.setState({
            loadingFull: false,
            message: data.message,
            isOpenModalError: true,
          });
        }
      }
    });
  };

  LoadRowData = () => {
    if (this.state.isLoadData === true) {
      return (
        <tbody className="animated fadeIn">
          <tr>
            <td className="text-center" colSpan="7">
              <br />
              <LoadingSpin />
            </td>
          </tr>
        </tbody>
      );
    }

    if (this.state.dataUser.length === 0) {
      return (
        <tbody className="animated fadeIn">
          <tr>
            <td className="text-center" colSpan="7">
              <br />
              <Text.Span className="font-medium">ไม่พบข้อมูล</Text.Span>
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody className="animated fadeIn">
        {this.state.dataUser.map((m, id) => {
          return (
            <tr
              id={"row" + id}
              key={id}
              className={id % 2 === 0 ? "row-even pointer" : "row-odd pointer"}
            >
              <td onClick={() => this.clickOpenFormPage(m._id)}>{m.name}</td>
              <td onClick={() => this.clickOpenFormPage(m._id)}>
                {m.username}
              </td>
              <td onClick={() => this.clickOpenFormPage(m._id)}>{m.role}</td>

              <td onClick={() => this.clickOpenFormPage(m._id)}>
                {moment(m.last_login).format("DD-MM-YYYY HH:mm:ss")}
              </td>
              <td className="textCenter">
                <Button
                  className="color-theme-button pointer margin3"
                  onClick={() => this.resetPassword(m._id)}
                >
                  Reset Password
                </Button>
                <Button
                  className="color-theme-button pointer margin3"
                  onClick={() => this.deleteUserByID(m._id)}
                >
                  <i className="fa fa-trash"></i> ลบ
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  render() {
    if (this.state.LoadError) {
      return (
        <div className="animated fadeIn">
          <div className="panel">
            <div className="panel-search">{this.state.PageError}</div>
          </div>
        </div>
      );
    }

    if (this.state.isOpenForm) {
      return (
        <FormUserManagement
          isOpenForm={this.state.isOpenForm}
          toggle={this.toggleIsOpenForm}
          userID={this.state.userID}
          action={this.state.action}
        />
      );
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
            <div className="panel-search">
              <Row>
                <Col sm={12} md={9} lg={9}>
                  <FormGroup>
                    <InputGroup>
                      <Input
                        className="input"
                        type="text"
                        id="textSearch"
                        name="textSearch"
                        placeholder="ค้นหา ตำแหน่ง"
                        onChange={(event) => {
                          this.setState({
                            role: event.target.value,
                          });
                        }}
                        value={this.state.role}
                        style={{ borderRightWidth: 0 }}
                        onKeyDown={(event) => {
                          if (event.keyCode === 13) {
                            this.fetchUser(1);
                          }
                        }}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText
                          style={{
                            backgroundColor: "#fff",
                            cursor: "pointer",
                            borderColor: "#e4e7ea",
                          }}
                        >
                          <img
                            alt="btnSearch"
                            id="btnSearch"
                            name="btnSearch"
                            src={IconGreenTealSearch}
                            onClick={() => {
                              this.fetchUser(1);
                            }}
                          />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col sm={12} md={3} lg={3}>
                  <RoundButton
                    id="btAddSearch"
                    className="btn-next"
                    style={{ width: "150px" }}
                    onClick={() => {
                      this.setState({
                        isOpenForm: true,
                        userID: "",
                        action: "Add",
                      });
                    }}
                  >
                    เพิ่มผู้ใช้งาน
                  </RoundButton>
                </Col>
              </Row>
            </div>

            <Table responsive striped>
              <thead className="thead">
                <tr className="row-head">
                  <th className="th ">ชื่อ - นามสกุล</th>
                  <th className="th ">ชื่อผู้ใช้</th>
                  <th className="th ">ตำแหน่ง</th>
                  <th className="th ">เข้าสู่ระบบครั้งล่าสุด</th>
                  <th className="th textCenter">Action</th>
                </tr>
              </thead>
              {this.LoadRowData()}
            </Table>

            <Row>
              <Col sm={12} md={12} lg={12} className="text-center">
                <center>
                  <Paging
                    PageSize={PAGE_LIMIT}
                    Total={
                      this.state.dataUser.length > 0
                        ? this.state.dataUserTotal
                        : 0
                    }
                    IsLoading={this.state.isLoadData}
                    PageActive={this.state.page}
                    onPageClick={(no) => {
                      this.setState({ page: no });
                      this.fetchUser(no);
                    }}
                  />
                </center>
              </Col>
            </Row>
          </div>

          <LoadingFullScreen loading={this.state.loadingFull} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  UserManagement: state.UserManagement,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchDataUser: fetchDataUser,
      fetchResetPassword: fetchResetPassword,
      setUserID: setUserID,
      fetchDeleteUserByID: fetchDeleteUserByID,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
