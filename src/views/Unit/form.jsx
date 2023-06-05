import React, { Component } from "react";
import { Row, Col, FormGroup, Input, Label, FormFeedback } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ModalError from "../../components/ModalError/index";
import LoadingFullScreen from "../../components/LoadingFullScreen";
import {
  fetchCreateUnit,
  fetchDataUnitByID,
  fetchUpdateUnitByID,
} from "../../services/Unit/action";
import LoadingSpin from "../../components/LoadingSpin";
import RoundButton from "../../components/Button/ButtonRound";
import { HeaderContent } from "../../components/HeaderContent";
import ModalSuccess from "../../components/ModalSuccess";

class FormUnit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadData: false,

      loadingFull: false,

      dataUnit: {
        name: "",
      },

      isValidateName: false,

      message: "",
      isOpenModalSuccess: false,
      isOpenModalError: false,
    };
  }

  componentDidMount = async () => {
    window.scrollTo(0, 0);

    if (this.props.action === "Edit" || this.props.action === "View") {
      this.setState({ isLoadData: true });
      await this.fetchUnitByID();
    } else {
      this.setState({ isLoadData: false });
    }
  };

  componentWillUnmount = async () => {};

  fetchUnitByID = async () => {
    const { fetchDataUnitByID, unitID } = this.props;

    let response = await fetchDataUnitByID(unitID);

    let { status, data } = response;

    if (status === 200) {
      if (data && data.result.length > 0) {
        this.setState({
          dataUnit: data.result[0],
        });
      }
      this.setState({
        isLoadData: false,
      });
    } else {
      this.setState({ isLoadData: false });
    }
  };

  validateInput = async () => {
    const { dataUnit } = this.state;

    if (dataUnit.name && dataUnit.name !== "") {
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

    const { isValidateName } = this.state;

    if (!isValidateName) {
      const { fetchCreateUnit, fetchUpdateUnitByID } = this.props;
      if (this.props.action === "Add") {
        this.setState({ loadingFull: true });

        let body = this.state.dataUnit;

        let response = await fetchCreateUnit(body);

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

        let body = {};
        body.name = this.state.dataUnit.name;

        let response = await fetchUpdateUnitByID(this.state.dataUnit._id, body);

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
                  : "แก้ไข") + "หน่วยสินค้า"
              }
              isBtnBack={true}
              onClick={this.props.toggle}
            />

            <div className="panel-search">
              <Row>
                <Col lg={6} md={6} xs={12}>
                  <FormGroup>
                    <Label htmlFor="Unitname" className="label">
                      ชื่อหน่วยสินค้า
                    </Label>
                    <Input
                      autoComplete="off"
                      className="input"
                      type="text"
                      id="Unitname"
                      disabled={this.props.action === "View" ? true : false}
                      name="Unitname"
                      placeholder="ชื่อหน่วยสินค้า"
                      onChange={(event) => {
                        this.setState({
                          dataUnit: {
                            ...this.state.dataUnit,
                            name: event.target.value,
                          },
                        });
                      }}
                      value={this.state.dataUnit.name}
                      invalid={this.state.isValidateName}
                    />
                    <FormFeedback
                      className="errorMessage"
                      style={{
                        display: this.state.isValidateName ? "block" : "none",
                      }}
                    >
                      กรุณาระบุ ชื่อหน่วยสินค้า
                    </FormFeedback>
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
      fetchDataUnitByID: fetchDataUnitByID,
      fetchCreateUnit: fetchCreateUnit,
      fetchUpdateUnitByID: fetchUpdateUnitByID,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FormUnit);
