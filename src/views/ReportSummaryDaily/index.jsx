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
import { fetchDataPosRealSaleFalse } from "../../services/Pos/action";
import LoadingSpin from "../../components/LoadingSpin";
import { IconGreenTealSearch } from "../../components/Image";
import moment from "moment";
import ModalSuccess from "../../components/ModalSuccess";
import Paging from "../../components/Paging";
import { PAGE_LIMIT } from "../../config/base";
import { Text } from "../../components/Text";
import FormPos from "./form";

class ReportSummaryDaily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadData: false,

      loadingFull: false,

      dataPos: [],
      dataPosTotal: 0,
      page: 1,

      isOpenForm: false,
      posID: null,
      action: null,
      message: "",
      isOpenModalSuccess: false,
      isOpenModalError: false,

      code_bill: "",
    };
  }

  componentDidMount = async () => {
    window.scrollTo(0, 0);

    await this.fetchPos(1);
  };

  componentWillUnmount = async () => {};

  toggleIsOpenForm = async () => {
    this.setState({ isOpenForm: !this.state.isOpenForm });
    if (this.state.isOpenForm) {
      this.setState({ page: 1 });
      await this.fetchPos(1);
    }
  };

  toggleIsOpenModalSuccess = async () => {
    this.setState({ isOpenModalSuccess: !this.state.isOpenModalSuccess });
  };

  toggleIsOpenModalError = async () => {
    this.setState({ isOpenModalError: !this.state.isOpenModalError });
  };

  fetchPos = async (page) => {
    this.setState({ isLoadData: true, page: page });
    const { fetchDataPosRealSaleFalse } = this.props;

    let response = await fetchDataPosRealSaleFalse(page, this.state.code_bill);

    let { status, data } = response;

    if (status === 200) {
      if (data.result.length > 0) {
        data.result.map((item) => {
          return (item.detail = JSON.parse(item.detail));
        });
      }

      this.setState({
        dataPos: data.result,
        dataPosTotal: data.total,
        isLoadData: false,
      });
    } else {
      this.setState({
        dataPos: [],
        dataPosTotal: 0,
        isLoadData: false,
      });
    }
  };

  clickOpenFormPage = (_id) => {
    this.setState({
      isOpenForm: true,
      posID: _id,
      action: "Edit",
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

    if (this.state.dataPos.length === 0) {
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
        {this.state.dataPos.map((m, id) => {
          return (
            <tr id={"row" + id} key={id} className={"textCenter"}>
              <td>{m.code_bill}</td>
              <td>{m.customer_code}</td>
              <td>{m.customer_name}</td>
              <td>{m.status}</td>
              <td>{moment(m.sale_date).format("DD-MM-YYYY")}</td>
              <td>
                <Button
                  className="color-theme-button pointer margin3"
                  onClick={async () => {
                    await this.clickOpenFormPage(m._id);
                  }}
                >
                  <i className="fa fa-eye"></i> ดู
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
        <FormPos
          isOpenForm={this.state.isOpenForm}
          toggle={this.toggleIsOpenForm}
          posID={this.state.posID}
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
                <Col sm={12} md={12} lg={12}>
                  <FormGroup>
                    <InputGroup>
                      <Input
                        className="input"
                        type="text"
                        id="textSearchCodePos"
                        name="textSearchCodePos"
                        placeholder="ค้นหา เลขที่บิล"
                        onChange={(event) => {
                          this.setState({
                            code_bill: event.target.value,
                          });
                        }}
                        value={this.state.code_bill}
                        onKeyDown={(event) => {
                          if (event.keyCode === 13) {
                            this.fetchPos(1);
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
                              this.fetchPos(1);
                            }}
                          />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
            </div>
            <Table responsive striped>
              <thead className="thead">
                <tr className="row-head">
                  <th className="th textCenter">เลขที่บิล</th>
                  <th className="th textCenter">รหัสลูกค้า</th>
                  <th className="th textCenter">ชื่อลูกค้า</th>
                  <th className="th textCenter">สถานะ</th>
                  <th className="th textCenter">วันที่ซื้อขาย</th>
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
                      this.state.dataPos.length > 0
                        ? this.state.dataPosTotal
                        : 0
                    }
                    IsLoading={this.state.isLoadData}
                    PageActive={this.state.page}
                    onPageClick={(no) => {
                      this.setState({ page: no });
                      this.fetchPos(no);
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
      fetchDataPosRealSaleFalse: fetchDataPosRealSaleFalse,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ReportSummaryDaily);
