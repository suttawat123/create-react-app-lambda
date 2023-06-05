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
import {
  fetchDataCustomer,
  fetchDeleteCustomerByID,
} from "../../services/Customer/action";
import FormCustomer from "./form";
import LoadingSpin from "../../components/LoadingSpin";
import RoundButton from "../../components/Button/ButtonRound";
import moment from "moment";
import ModalSuccess from "../../components/ModalSuccess";
import Paging from "../../components/Paging";
import { PAGE_LIMIT } from "../../config/base";
import Swal from "sweetalert2";
import { IconGreenTealSearch } from "../../components/Image";
import { Text } from "../../components/Text";

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadData: false,

      loadingFull: false,

      dataCustomer: [],
      dataCustomerTotal: 0,
      page: 1,

      isOpenForm: false,
      customerID: null,
      action: null,
      message: "",
      isOpenModalSuccess: false,
      isOpenModalError: false,

      customer_code: "",
      customer_name: "",
    };
  }

  componentDidMount = async () => {
    window.scrollTo(0, 0);

    await this.fetchCustomer(1);
  };

  componentWillUnmount = async () => {};

  toggleIsOpenForm = async () => {
    this.setState({ isOpenForm: !this.state.isOpenForm });
    if (this.state.isOpenForm) {
      this.setState({ page: 1 });
      await this.fetchCustomer(1);
    }
  };

  toggleIsOpenModalSuccess = async () => {
    this.setState({ isOpenModalSuccess: !this.state.isOpenModalSuccess });
  };

  toggleIsOpenModalError = async () => {
    this.setState({ isOpenModalError: !this.state.isOpenModalError });
  };

  fetchCustomer = async (page) => {
    this.setState({ isLoadData: true, page: page });
    const { fetchDataCustomer } = this.props;

    let response = await fetchDataCustomer(
      page,
      this.state.customer_name,
      this.state.customer_code
    );

    if (response) {
      let { status, data } = response;

      if (status === 200) {
        this.setState({
          dataCustomer: data.result,
          dataCustomerTotal: data.total,
          isLoadData: false,
        });
      } else {
        this.setState({
          dataCustomer: [],
          dataCustomerTotal: 0,
          isLoadData: false,
        });
      }
    } else {
      this.setState({
        dataCustomer: [],
        dataCustomerTotal: 0,
        isLoadData: false,
      });
    }
  };

  deleteCustomerByID = async (_id) => {
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
        const { fetchDeleteCustomerByID } = this.props;

        let response = await fetchDeleteCustomerByID(_id);

        let { status, data } = response;

        if (status === 200) {
          this.setState({
            loadingFull: false,
            message: data.message,
            isOpenModalSuccess: true,
          });
          await this.fetchCustomer(1);
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
      customerID: _id,
      action: "Edit",
    });
  };

  LoadRowData = () => {
    if (this.state.isLoadData === true) {
      return (
        <tbody className="animated fadeIn">
          <tr>
            <td className="text-center" colSpan="5">
              <br />
              <LoadingSpin />
            </td>
          </tr>
        </tbody>
      );
    }

    if (this.state.dataCustomer.length === 0) {
      return (
        <tbody className="animated fadeIn">
          <tr>
            <td className="text-center" colSpan="5">
              <br />
              <Text.Span className="font-medium">ไม่พบข้อมูล</Text.Span>
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody className="animated fadeIn">
        {this.state.dataCustomer.map((m, id) => {
          return (
            <tr id={"row" + id} key={id} className={"textCenter"}>
              <td>{m.code}</td>
              <td>{m.name}</td>
              <td>{m.phone}</td>
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
                  onClick={() => this.deleteCustomerByID(m._id)}
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
        <FormCustomer
          isOpenForm={this.state.isOpenForm}
          toggle={this.toggleIsOpenForm}
          customerID={this.state.customerID}
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
                <Col sm={12} md={5} lg={5}>
                  <FormGroup>
                    <InputGroup>
                      <Input
                        className="input"
                        type="text"
                        id="textSearchCodeCustomer"
                        name="textSearchCodeCustomer"
                        placeholder="ค้นหา รหัสลูกค้า"
                        onChange={(event) => {
                          this.setState({
                            customer_code: event.target.value,
                          });
                        }}
                        value={this.state.customer_code}
                        onKeyDown={async (event) => {
                          if (event.keyCode === 13) {
                            await this.setState({
                              customer_name: "",
                            });
                            await this.fetchCustomer(1);
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
                            onClick={async () => {
                              await this.setState({
                                customer_name: "",
                              });
                              await this.fetchCustomer(1);
                            }}
                          />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col sm={12} md={5} lg={5}>
                  <FormGroup>
                    <InputGroup>
                      <Input
                        className="input"
                        type="text"
                        id="textSearchNameCustomer"
                        name="textSearchNameCustomer"
                        placeholder="ค้นหา ชื่อลูกค้า"
                        onChange={(event) => {
                          this.setState({
                            customer_name: event.target.value,
                          });
                        }}
                        value={this.state.customer_name}
                        onKeyDown={async (event) => {
                          if (event.keyCode === 13) {
                            await this.setState({
                              customer_code: "",
                            });
                            this.fetchCustomer(1);
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
                            onClick={async () => {
                              await this.setState({
                                customer_code: "",
                              });
                              this.fetchCustomer(1);
                            }}
                          />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Col>

                <Col sm={12} md={2} lg={2}>
                  <RoundButton
                    id="btAddSearch"
                    className="btn-next"
                    style={{ width: "150px" }}
                    onClick={() => {
                      this.setState({
                        isOpenForm: true,
                        customerID: "",
                        action: "Add",
                      });
                    }}
                  >
                    เพิ่มลูกค้า
                  </RoundButton>
                </Col>
              </Row>
            </div>

            <Table responsive striped>
              <thead className="thead">
                <tr className="row-head">
                  <th className="th textCenter">รหัสลูกค้า</th>
                  <th className="th textCenter">ชื่อลูกค้า</th>
                  <th className="th textCenter">เบอร์โทรศัพท์</th>
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
                      this.state.dataCustomer.length > 0
                        ? this.state.dataCustomerTotal
                        : 0
                    }
                    IsLoading={this.state.isLoadData}
                    PageActive={this.state.page}
                    onPageClick={(no) => {
                      this.setState({ page: no });
                      this.fetchCustomer(no);
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
      fetchDataCustomer: fetchDataCustomer,
      fetchDeleteCustomerByID: fetchDeleteCustomerByID,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
