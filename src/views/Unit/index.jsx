import React, { Component } from "react";
import {
  Row,
  Col,
  Table,
  Button,
  FormGroup,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ModalError from "../../components/ModalError/index";
import LoadingFullScreen from "../../components/LoadingFullScreen";
import { fetchDataUnit, fetchDeleteUnitByID } from "../../services/Unit/action";
import FormUnit from "./form";
import LoadingSpin from "../../components/LoadingSpin";
import RoundButton from "../../components/Button/ButtonRound";
import moment from "moment";
import ModalSuccess from "../../components/ModalSuccess";
import Paging from "../../components/Paging";
import { PAGE_LIMIT } from "../../config/base";
import Swal from "sweetalert2";
import { IconGreenTealSearch } from "../../components/Image";
import { Text } from "../../components/Text";

class Unit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadData: false,

      loadingFull: false,

      dataUnit: [],
      dataUnitTotal: 0,
      page: 1,

      isOpenForm: false,
      unitID: null,
      action: null,
      message: "",
      isOpenModalSuccess: false,
      isOpenModalError: false,

      name: "",
    };
  }

  componentDidMount = async () => {
    window.scrollTo(0, 0);

    await this.fetchUnit(1);
  };

  componentWillUnmount = async () => {};

  toggleIsOpenForm = async () => {
    this.setState({ isOpenForm: !this.state.isOpenForm });
    if (this.state.isOpenForm) {
      this.setState({ page: 1 });
      await this.fetchUnit(1);
    }
  };

  toggleIsOpenModalSuccess = async () => {
    this.setState({ isOpenModalSuccess: !this.state.isOpenModalSuccess });
  };

  toggleIsOpenModalError = async () => {
    this.setState({ isOpenModalError: !this.state.isOpenModalError });
  };

  fetchUnit = async (page) => {
    this.setState({ isLoadData: true, page: page });
    const { fetchDataUnit } = this.props;

    let response = await fetchDataUnit(page, this.state.name);

    if (response) {
      let { status, data } = response;

      if (status === 200) {
        this.setState({
          dataUnit: data.result,
          dataUnitTotal: data.total,
          isLoadData: false,
        });
      } else {
        this.setState({
          dataUnit: [],
          dataUnitTotal: 0,
          isLoadData: false,
        });
      }
    } else {
      this.setState({
        dataUnit: [],
        dataUnitTotal: 0,
        isLoadData: false,
      });
    }
  };

  deleteUnitByID = async (_id) => {
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
        const { fetchDeleteUnitByID } = this.props;

        let response = await fetchDeleteUnitByID(_id);

        let { status, data } = response;

        if (status === 200) {
          this.setState({
            loadingFull: false,
            message: data.message,
            isOpenModalSuccess: true,
          });
          await this.fetchUnit(1);
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
      unitID: _id,
      action: "Edit",
    });
  };

  LoadRowData = () => {
    if (this.state.isLoadData === true) {
      return (
        <tbody className="animated fadeIn">
          <tr>
            <td className="text-center" colSpan="3">
              <br />
              <LoadingSpin />
            </td>
          </tr>
        </tbody>
      );
    }

    if (this.state.dataUnit.length === 0) {
      return (
        <tbody className="animated fadeIn">
          <tr>
            <td className="text-center" colSpan="3">
              <br />
              <Text.Span className="font-medium">ไม่พบข้อมูล</Text.Span>
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody className="animated fadeIn">
        {this.state.dataUnit.map((m, id) => {
          return (
            <tr id={"row" + id} key={id} className={"textCenter"}>
              <td>{m.name}</td>
              <td>{moment(m.update_at).format("DD-MM-YYYY")}</td>
              <td>
                <Button
                  className="color-theme-button pointer margin3"
                  onClick={() => this.clickOpenFormPage(m._id)}
                >
                  <i className="fa fa-edit"></i> แก้ไข
                </Button>
                <Button
                  className="color-theme-button pointer margin3"
                  onClick={() => this.deleteUnitByID(m._id)}
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
        <FormUnit
          isOpenForm={this.state.isOpenForm}
          toggle={this.toggleIsOpenForm}
          unitID={this.state.unitID}
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
            <div className="panel-search mb-15">
              <Row>
                <Col sm={9} md={9} lg={9}>
                  <FormGroup>
                    <InputGroup>
                      <Input
                        className="input"
                        type="text"
                        id="textSearchUnit"
                        name="textSearchUnit"
                        placeholder="ค้นหา ชื่อหน่วยสินค้า"
                        onChange={(event) => {
                          this.setState({
                            name: event.target.value,
                          });
                        }}
                        value={this.state.name}
                        onKeyDown={(event) => {
                          if (event.keyCode === 13) {
                            this.fetchUnit(1);
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
                              this.fetchUnit(1);
                            }}
                          />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col sm={3} md={3} lg={3}>
                  <RoundButton
                    id="btAddSearch"
                    className="btn-next"
                    style={{ width: "150px" }}
                    onClick={() => {
                      this.setState({
                        isOpenForm: true,
                        unitID: "",
                        action: "Add",
                      });
                    }}
                  >
                    เพิ่มหน่วยสินค้า
                  </RoundButton>
                </Col>
              </Row>
            </div>

            <Table responsive striped>
              <thead className="thead">
                <tr className="row-head">
                  <th className="th textCenter">ชื่อหน่วยสินค้า</th>
                  <th className="th textCenter">อัพเดตครั้งล่าสุด</th>
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
                      this.state.dataUnit.length > 0
                        ? this.state.dataUnitTotal
                        : 0
                    }
                    IsLoading={this.state.isLoadData}
                    PageActive={this.state.page}
                    onPageClick={(no) => {
                      this.setState({ page: no });
                      this.fetchUnit(no);
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchDataUnit: fetchDataUnit,
      fetchDeleteUnitByID: fetchDeleteUnitByID,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Unit);
