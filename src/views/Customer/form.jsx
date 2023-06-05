import React, { Component } from "react";
import { Row, Col, FormGroup, Input, Label, FormFeedback } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ModalError from "../../components/ModalError/index";
import LoadingFullScreen from "../../components/LoadingFullScreen";
import {
  fetchCreateCustomer,
  fetchDataCustomerByID,
  fetchUpdateCustomerByID,
} from "../../services/Customer/action";
import LoadingSpin from "../../components/LoadingSpin";
import RoundButton from "../../components/Button/ButtonRound";
import { HeaderContent } from "../../components/HeaderContent";
import ModalSuccess from "../../components/ModalSuccess";

class FormCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadData: false,

      loadingFull: false,

      dataCustomer: {
        code: "",
        name: "",
        phone: "",
        address: "",
      },

      isValidateName: false,
      isValidateCode: false,

      message: "",
      isOpenModalSuccess: false,
      isOpenModalError: false,
    };
  }

  componentDidMount = async () => {
    window.scrollTo(0, 0);

    if (this.props.action === "Edit" || this.props.action === "View") {
      this.setState({ isLoadData: true });
      await this.fetchCustomerByID();
    } else {
      this.setState({ isLoadData: false });
    }
  };

  componentWillUnmount = async () => {};

  fetchCustomerByID = async () => {
    const { fetchDataCustomerByID, customerID } = this.props;

    let response = await fetchDataCustomerByID(customerID);

    if (response) {
      let { status, data } = response;

      if (status === 200) {
        if (data && data.result.length > 0) {
          this.setState({
            dataCustomer: data.result[0],
          });
        }
        this.setState({
          isLoadData: false,
        });
      } else {
        this.setState({ isLoadData: false });
      }
    } else {
      this.setState({ isLoadData: false });
    }
  };

  validateInput = async () => {
    const { dataCustomer } = this.state;

    if (dataCustomer.code && dataCustomer.code !== "") {
      this.setState({
        isValidateCode: false,
      });
    } else {
      this.setState({
        isValidateCode: true,
      });
    }

    if (dataCustomer.name && dataCustomer.name !== "") {
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

    const { isValidateName, isValidateCode } = this.state;

    if (!isValidateName && !isValidateCode) {
      const { fetchCreateCustomer, fetchUpdateCustomerByID } = this.props;
      if (this.props.action === "Add") {
        this.setState({ loadingFull: true });

        let body = this.state.dataCustomer;

        let response = await fetchCreateCustomer(body);

        if (response) {
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
        } else {
          this.setState({
            loadingFull: false,
          });
        }
      } else if (this.props.action === "Edit") {
        this.setState({ loadingFull: true });

        let data = this.state.dataCustomer;
        let body = {};
        body.code = data.code;
        body.name = data.name;
        body.phone = data.phone;
        body.address = data.address;

        let response = await fetchUpdateCustomerByID(data._id, body);

        if (response) {
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
        } else {
          this.setState({
            loadingFull: false,
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
                (this.props.action === "Add"
                  ? "เพิ่ม"
                  : this.props.action === "View"
                  ? "ดู"
                  : "แก้ไข") + "ลูกค้า"
              }
              isBtnBack={true}
              onClick={this.props.toggle}
            />

            <div className="panel-search">
              <Row>
                <Col lg={6} md={6} xs={12}>
                  <FormGroup>
                    <Label htmlFor="code" className="label">
                      รหัสลูกค้า
                    </Label>
                    <Input
                      autoComplete="off"
                      className="input"
                      type="text"
                      id="code"
                      disabled={this.props.action === "View" ? true : false}
                      name="code"
                      placeholder="รหัสลูกค้า"
                      onChange={(event) => {
                        this.setState({
                          dataCustomer: {
                            ...this.state.dataCustomer,
                            code: event.target.value,
                          },
                        });
                      }}
                      value={this.state.dataCustomer.code}
                      invalid={this.state.isValidateCode}
                    />
                    <FormFeedback
                      className="errorMessage"
                      style={{
                        display: this.state.isValidateCode ? "block" : "none",
                      }}
                    >
                      กรุณาระบุ รหัสลูกค้า
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col lg={6} md={6} xs={12}>
                  <FormGroup>
                    <Label htmlFor="name" className="label">
                      ชื่อลูกค้า
                    </Label>
                    <Input
                      autoComplete="off"
                      className="input"
                      type="text"
                      id="name"
                      disabled={this.props.action === "View" ? true : false}
                      name="name"
                      placeholder="ชื่อลูกค้า"
                      onChange={(event) => {
                        this.setState({
                          dataCustomer: {
                            ...this.state.dataCustomer,
                            name: event.target.value,
                          },
                        });
                      }}
                      value={this.state.dataCustomer.name}
                      invalid={this.state.isValidateName}
                    />
                    <FormFeedback
                      className="errorMessage"
                      style={{
                        display: this.state.isValidateName ? "block" : "none",
                      }}
                    >
                      กรุณาระบุ ชื่อลูกค้า
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={6} xs={12}>
                  <FormGroup>
                    <Label htmlFor="phone" className="label">
                      เบอร์โทรศัพท์
                    </Label>
                    <Input
                      autoComplete="off"
                      className="input"
                      type="number"
                      id="phone"
                      disabled={this.props.action === "View" ? true : false}
                      name="phone"
                      placeholder="เบอร์โทรศัพท์"
                      onChange={(event) => {
                        this.setState({
                          dataCustomer: {
                            ...this.state.dataCustomer,
                            phone: event.target.value,
                          },
                        });
                      }}
                      value={this.state.dataCustomer.phone}
                      // invalid={this.state.isValidateName}
                    />
                    {/* <FormFeedback
                      className="errorMessage"
                      style={{
                        display: this.state.isValidateName ? "block" : "none",
                      }}
                    >
                      กรุณาระบุ เบอร์โทรศัพท์
                    </FormFeedback> */}
                  </FormGroup>
                </Col>
                <Col lg={6} md={6} xs={12}>
                  <FormGroup>
                    <Label htmlFor="Customername" className="label">
                      ที่อยู่
                    </Label>
                    <Input
                      autoComplete="off"
                      className="input"
                      type="textarea"
                      id="address"
                      disabled={this.props.action === "View" ? true : false}
                      name="address"
                      placeholder="ที่อยู่"
                      onChange={(event) => {
                        this.setState({
                          dataCustomer: {
                            ...this.state.dataCustomer,
                            address: event.target.value,
                          },
                        });
                      }}
                      value={this.state.dataCustomer.address}
                      // invalid={this.state.isValidateName}
                    />
                    {/* <FormFeedback
                      className="errorMessage"
                      style={{
                        display: this.state.isValidateName ? "block" : "none",
                      }}
                    >
                      กรุณาระบุ ที่อยู่
                    </FormFeedback> */}
                  </FormGroup>
                </Col>
              </Row>
              {this.props.action !== "View" ? (
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
      fetchDataCustomerByID: fetchDataCustomerByID,
      fetchCreateCustomer: fetchCreateCustomer,
      fetchUpdateCustomerByID: fetchUpdateCustomerByID,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FormCustomer);
