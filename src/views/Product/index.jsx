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
  fetchDataProduct,
  fetchDeleteProductByID,
} from "../../services/Product/action";
import FormProduct from "./form";
import LoadingSpin from "../../components/LoadingSpin";
import RoundButton from "../../components/Button/ButtonRound";
import { IconGreenTealSearch } from "../../components/Image";

import ModalSuccess from "../../components/ModalSuccess";
import Paging from "../../components/Paging";
import { PAGE_LIMIT } from "../../config/base";
import { NumberFormatToFixed } from "../../services/Helpers/function";
import Swal from "sweetalert2";
import { Text } from "../../components/Text";

import BarcodeReader from "react-barcode-reader";
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadData: false,

      loadingFull: false,

      dataProduct: [],
      dataProductTotal: 0,
      page: 1,

      isOpenForm: false,
      productID: null,
      action: null,
      message: "",
      isOpenModalSuccess: false,
      isOpenModalError: false,

      product_name: "",
      product_code: "",
    };

    this.handleScan = this.handleScan.bind(this);
  }

  handleScan(data) {
    this.setState({
      product_code: data,
    });
  }

  handleError(err) {
    console.error(err);
  }

  componentDidMount = async () => {
    window.scrollTo(0, 0);

    if (this.props.Product.productID) {
      this.clickOpenFormPage(this.props.Product.productID);
    } else {
      await this.fetchProduct(1);
    }
  };

  componentWillUnmount = async () => {};

  toggleIsOpenForm = async () => {
    this.setState({ isOpenForm: !this.state.isOpenForm });
    if (this.state.isOpenForm) {
      this.setState({ page: 1 });

      await this.fetchProduct(1);
    }
  };

  toggleIsOpenModalSuccess = async () => {
    this.setState({ isOpenModalSuccess: !this.state.isOpenModalSuccess });
  };

  toggleIsOpenModalError = async () => {
    this.setState({ isOpenModalError: !this.state.isOpenModalError });
  };

  fetchProduct = async (page) => {
    this.setState({ isLoadData: true, page: page });
    const { fetchDataProduct } = this.props;

    let response = await fetchDataProduct(
      page,
      this.state.product_name,
      this.state.product_code
    );

    let { status, data } = response;

    if (status === 200) {
      this.setState({
        dataProduct: data.result,
        dataProductTotal: data.total,
        isLoadData: false,
      });
    } else {
      this.setState({
        dataProduct: [],
        dataProductTotal: 0,
        isLoadData: false,
      });
    }
  };

  deleteProductByID = async (_id) => {
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
        const { fetchDeleteProductByID } = this.props;

        let response = await fetchDeleteProductByID(_id);

        let { status, data } = response;

        if (status === 200) {
          this.setState({
            loadingFull: false,
            message: data.message,
            isOpenModalSuccess: true,
          });
          await this.fetchProduct(1);
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
      productID: _id,
      action: "Edit",
    });
  };

  LoadRowData = () => {
    if (this.state.isLoadData === true) {
      return (
        <tbody className="animated fadeIn">
          <tr>
            <td className="text-center" colSpan="8">
              <br />

              <LoadingSpin />
            </td>
          </tr>
        </tbody>
      );
    }

    if (this.state.dataProduct.length === 0) {
      return (
        <tbody className="animated fadeIn">
          <tr>
            <td className="text-center" colSpan="8">
              <br />
              <Text.Span className="font-medium">ไม่พบข้อมูล</Text.Span>
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody className="animated fadeIn">
        {this.state.dataProduct.map((m, id) => {
          return (
            <tr id={"row" + id} key={id} className={"textCenter"}>
              <td>{m.code}</td>
              <td>{m.name}</td>
              <td>{m.unit}</td>
              <td>{m.category_product}</td>
              <td>{NumberFormatToFixed(m.cost_price)}</td>
              <td>{NumberFormatToFixed(m.whole_sale_price)}</td>
              <td>{NumberFormatToFixed(m.retail_price)}</td>
              <td>
                <Button
                  className="color-theme-button pointer margin3"
                  onClick={() => this.clickOpenFormPage(m._id)}
                >
                  <i className="fa fa-edit"></i> แก้ไข
                </Button>
                <Button
                  className="color-theme-button pointer margin3"
                  onClick={() => this.deleteProductByID(m._id)}
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
        <FormProduct
          isOpenForm={this.state.isOpenForm}
          toggle={this.toggleIsOpenForm}
          productID={this.state.productID}
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
              <div>
                <BarcodeReader
                  onError={this.handleError}
                  onScan={this.handleScan}
                />
              </div>
              <Row>
                <Col sm={12} md={5} lg={5}>
                  <FormGroup>
                    <InputGroup>
                      <Input
                        className="input"
                        type="text"
                        id="textSearchCodeProduct"
                        name="textSearchCodeProduct"
                        placeholder="ค้นหา รหัสสินค้า"
                        onChange={(event) => {
                          this.setState({
                            product_code: event.target.value,
                          });
                        }}
                        value={this.state.product_code}
                        onKeyDown={async (event) => {
                          if (event.keyCode === 13) {
                            await this.setState({
                              product_name: "",
                            });
                            await this.fetchProduct(1);
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
                                product_name: "",
                              });
                              await this.fetchProduct(1);
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
                        id="textSearchNameProduct"
                        name="textSearchNameProduct"
                        placeholder="ค้นหา ชื่อสินค้า"
                        onChange={(event) => {
                          this.setState({
                            product_name: event.target.value,
                          });
                        }}
                        value={this.state.product_name}
                        onKeyDown={async (event) => {
                          if (event.keyCode === 13) {
                            await this.setState({
                              product_code: "",
                            });
                            await this.fetchProduct(1);
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
                                product_code: "",
                              });
                              await this.fetchProduct(1);
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
                        productID: "",
                        action: "Add",
                      });
                    }}
                  >
                    เพิ่มสินค้า
                  </RoundButton>
                </Col>
              </Row>
            </div>

            <Table responsive striped>
              <thead className="thead">
                <tr className="row-head">
                  <th className="th textCenter">รหัสสินค้า</th>
                  <th className="th textCenter">ชื่อสินค้า</th>
                  <th className="th textCenter">หน่วยสินค้า</th>
                  <th className="th textCenter">หมวดหมู่สินค้า</th>
                  <th className="th textCenter">ราคาทุน</th>
                  <th className="th textCenter">ราคาขายส่ง</th>
                  <th className="th textCenter">ราคาขายปลีก</th>
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
                      this.state.dataProduct.length > 0
                        ? this.state.dataProductTotal
                        : 0
                    }
                    IsLoading={this.state.isLoadData}
                    PageActive={this.state.page}
                    onPageClick={(no) => {
                      this.setState({ page: no });
                      this.fetchProduct(no);
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
  Product: state.Product,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchDataProduct: fetchDataProduct,
      fetchDeleteProductByID: fetchDeleteProductByID,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Product);
