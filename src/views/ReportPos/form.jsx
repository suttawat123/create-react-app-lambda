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
  FormFeedback,
  Modal,
  ModalBody,
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ModalError from "../../components/ModalError/index";
import LoadingFullScreen from "../../components/LoadingFullScreen";
import { fetchDataUnitNoLimit } from "../../services/Unit/action";
import LoadingSpin from "../../components/LoadingSpin";
import RoundButton from "../../components/Button/ButtonRound";
import moment from "moment";
import ModalSuccess from "../../components/ModalSuccess";
import Swal from "sweetalert2";
import { IconGreenTealSearch } from "../../components/Image";
import Dropdown from "../../components/Dropdown";
import { NumberFormatToFixed } from "../../services/Helpers/function";
import { Text } from "../../components/Text";
import { fetchDataCustomerNoLimit } from "../../services/Customer/action";
import { fetchDataProduct } from "../../services/Product/action";
import {
  fetchUpdatePosByID,
  fetchDataPosByID,
} from "../../services/Pos/action";

import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { PrintPos } from "../../components/PrintPos";
import { fetchDataCategoryProductNoLimit } from "../../services/CategoryProduct/action";
import { HeaderContent } from "../../components/HeaderContent";
import BarcodeReader from "react-barcode-reader";
import Paging from "../../components/Paging";
import { PAGE_LIMIT } from "../../config/base";

class FormPos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadData: false,
      isLoadDataProduct: false,
      loadingFull: false,

      customer: "",
      categoryProduct: { value: "ทั้งหมด", label: "ทั้งหมด" },

      dataPos: {
        code_bill: "",
        sale_date: new Date(),
        customer_code: "",
        customer_name: "",
        customer_address: "",
        customer_phone: "",
        type_price: {
          value: "ขายส่ง",
          label: "ขายส่ง",
        },
        detail: [],
        withholding_tax: 0,
        discount: 0,
        vat: 7,
        total_net: 0,
        total_cost_price_net: 0,
      },

      dataUnit: [],
      dataCustomer: [],
      dataCategoryProduct: [{ name: "ทั้งหมด" }],
      dataProduct: [],
      dataProductSelect: [],
      dataTypePrice: [
        {
          name: "ขายส่ง",
        },
        { name: "ขายปลีก" },
      ],

      dataPrint: {},

      product_name: "",
      product_code: "",

      message: "",
      isOpenModalSuccess: false,
      isOpenModalError: false,
      isOpenModalProduct: false,

      isValidateCustomer: false,
      isValidateDetail: false,
      isDisable: false,
    };
    this.handleScanCodeProduct = this.handleScanCodeProduct.bind(this);
  }

  handleScanCodeProduct = async (data) => {
    await this.setState({
      product_name: "",
      product_code: data,
    });
    await this.fetchProduct(1);
  };

  handleError(err) {
    console.error(err);
  }

  componentDidMount = async () => {
    window.scrollTo(0, 0);

    this.setState({
      loadingFull: true,
    });

    await this.fetchDataUnit();
    await this.fetchDataCustomer();
    await this.fetchDataCategoryProduct();
    await this.fetchDataPosByID();
  };

  componentWillUnmount = async () => {};

  randomCode = async () => {
    const date = moment(new Date()).format("DDMMYYYY").toString();
    const result =
      Math.floor(Math.random() * (9 * Math.pow(10, 4))) + Math.pow(10, 4);

    return date + "-" + result;
  };

  fetchDataPosByID = async () => {
    const { fetchDataPosByID, posID } = this.props;

    let response = await fetchDataPosByID(posID);

    if (response) {
      let { status, data } = response;

      if (status === 200) {
        await this.setState({
          dataPos: data.result[0],
        });

        if (data.result[0].detail) {
          let detailNew = JSON.parse(data.result[0].detail);

          await this.setState({
            dataPos: {
              ...this.state.dataPos,
              detail: detailNew,
            },
          });
        }

        if (data.result[0].type_price) {
          await this.setState({
            dataPos: {
              ...this.state.dataPos,
              type_price: {
                label: data.result[0].type_price,
                value: data.result[0].type_price,
              },
            },
          });
        }

        if (data.result[0].customer_code && data.result[0].customer_name) {
          await this.setState({
            customer: {
              value: data.result[0].customer_code,
              label:
                data.result[0].customer_code +
                "/" +
                data.result[0].customer_name,
            },
          });
        }

        this.setState({ loadingFull: false });
      } else {
        this.setState({ loadingFull: false });
      }
    } else {
      this.setState({ loadingFull: false });
    }
  };

  fetchDataUnit = async () => {
    const { fetchDataUnitNoLimit } = this.props;
    let response = await fetchDataUnitNoLimit();
    if (response) {
      let { status, data } = response;

      if (status === 200) {
        this.setState({
          dataUnit: data.result,
        });
      }
    }
  };

  fetchDataCustomer = async () => {
    const { fetchDataCustomerNoLimit } = this.props;

    let response = await fetchDataCustomerNoLimit();

    if (response) {
      let { status, data } = response;

      if (status === 200) {
        this.setState({
          dataCustomer: data.result,
        });
      }
    }
  };

  fetchDataCategoryProduct = async () => {
    const { fetchDataCategoryProductNoLimit } = this.props;
    let response = await fetchDataCategoryProductNoLimit();
    if (response) {
      let { status, data } = response;

      if (status === 200) {
        let dataNew = this.state.dataCategoryProduct.concat(data.result);
        this.setState({
          dataCategoryProduct: dataNew,
        });
      }
    }
  };

  fetchProduct = async () => {
    const { fetchDataProduct } = this.props;

    let response = await fetchDataProduct(
      1,
      null,
      this.state.product_code,
      null
    );

    if (response) {
      let { status, data } = response;

      if (status === 200) {
        if (data.result && data.result.length > 0) {
          let dataDetail = this.state.dataPos.detail;

          let index = dataDetail.findIndex(
            (c) => c.code === data.result[0].code
          );
          if (index !== -1) {
            dataDetail[index].amount = dataDetail[index].amount + 1;

            dataDetail[index].total_price =
              this.state.dataPos.type_price.value === "ขายส่ง"
                ? data.result[0].whole_sale_price *
                  (dataDetail[index].amount + 1)
                : data.result[0].retail_price * (dataDetail[index].amount + 1);
            dataDetail[index].total_cost_price =
              data.result[0].cost_price * (dataDetail[index].amount + 1);

            await this.setValueTotalNet();
            await this.checkPrintBill();
          } else {
            dataDetail.push({
              code: data.result[0].code,
              name: data.result[0].name,
              unit: { value: data.result[0].unit, label: data.result[0].unit },
              sale_price:
                this.state.dataPos.type_price.value === "ขายส่ง"
                  ? data.result[0].whole_sale_price
                  : data.result[0].retail_price,
              whole_sale_price: data.result[0].whole_sale_price,
              retail_price: data.result[0].retail_price,
              cost_price: data.result[0].cost_price,
              amount: 1,
              total_price:
                this.state.dataPos.type_price.value === "ขายส่ง"
                  ? data.result[0].whole_sale_price
                  : data.result[0].retail_price,
              total_cost_price: data.result[0].cost_price,
            });
          }
          await this.setState({
            dataPos: {
              ...this.state.dataPos,
              detail: dataDetail,
            },
            product_code: "",
            product_name: "",
          });
          await this.setValueTotalNet();
          await this.checkPrintBill();
        } else {
          this.setState({
            isLoadData: false,
            product_code: "",
            product_name: "",
          });
        }
      }
    } else {
      this.setState({ isLoadData: false, product_code: "", product_name: "" });
    }
  };

  fetchSearchProduct = async (page) => {
    await this.setState({
      isLoadDataProduct: true,
    });

    const { fetchDataProduct } = this.props;

    let category = null;
    if (this.state.categoryProduct.value !== "ทั้งหมด") {
      category = this.state.categoryProduct.value;
    }
    let response = await fetchDataProduct(
      page,
      this.state.product_name,
      null,
      category
    );

    if (response) {
      let { status, data } = response;

      if (status === 200) {
        if (data.result && data.result.length > 0) {
          this.setState({
            dataProduct: data.result,
            isLoadDataProduct: false,
            dataProductTotal: data.total,
          });
        } else {
          this.setState({
            dataProduct: [],
            isLoadDataProduct: false,
            dataProductTotal: 0,
          });
        }
      }
    } else {
      this.setState({ isLoadDataProduct: false });
    }
  };

  selectProductSearch = async (data, i) => {
    let dataDetail = this.state.dataPos.detail;
    let index = dataDetail.findIndex((c) => c.code === data.code);
    if (index !== -1) {
      dataDetail[index].amount = dataDetail[index].amount + 1;
    } else {
      dataDetail.push({
        code: data.code,
        name: data.name,
        unit: { value: data.unit, label: data.unit },
        sale_price:
          this.state.dataPos.type_price.value === "ขายส่ง"
            ? data.whole_sale_price
            : data.retail_price,
        whole_sale_price: data.whole_sale_price,
        retail_price: data.retail_price,
        cost_price: data.cost_price,
        amount: 1,
        total_price:
          this.state.dataPos.type_price.value === "ขายส่ง"
            ? data.whole_sale_price
            : data.retail_price,
        total_cost_price: data.cost_price,
      });
    }
    await this.setState({
      dataPos: {
        ...this.state.dataPos,
        detail: dataDetail,
      },
      product_code: "",
      product_name: "",
      categoryProduct: { value: "ทั้งหมด", label: "ทั้งหมด" },
      dataProduct: [],
      isOpenModalProduct: false,
    });
    await this.setValueTotalNet();
    await this.checkPrintBill();
  };

  changeTypePrice = async (value) => {
    let dataDetail = this.state.dataPos.detail;
    if (dataDetail.length > 0) {
      dataDetail.map((data, index) => {
        if (value.value === "ขายส่ง") {
          data.sale_price = data.whole_sale_price;
          data.total_price = data.whole_sale_price * data.amount;
        } else if (value.value === "ขายปลีก") {
          data.sale_price = data.retail_price;
          data.total_price = data.retail_price * data.amount;
        }
        return true;
      });

      await this.setState({
        dataPos: {
          ...this.state.dataPos,
          detail: dataDetail,
        },
      });
      await this.setValueTotalNet();
    }
  };

  setValueCustomer = async (value) => {
    let data = this.state.dataCustomer;

    let find = data.filter((c) => c.code === value.value);

    if (find && find.length > 0) {
      await this.setState({
        dataPos: {
          ...this.state.dataPos,
          customer_code: find[0].code,
          customer_name: find[0].name,
          customer_address: find[0].address,
          customer_phone: find[0].phone,
        },
      });
      await this.checkPrintBill();
    }
  };

  setValueAmount = async (value, id) => {
    let data = this.state.dataPos.detail;
    data[id].amount = value;
    data[id].total_price = value * data[id].sale_price;
    data[id].total_cost_price = value * data[id].cost_price;

    await this.setState({
      dataPos: {
        ...this.state.dataPos,
        detail: data,
      },
    });
    await this.setValueTotalNet();
  };

  setValueSalePrice = async (value, id) => {
    let data = this.state.dataPos.detail;

    data[id].sale_price = value !== "" && value !== 0 ? value : 1;
    data[id].total_price = data[id].amount * data[id].sale_price;

    await this.setState({
      dataPos: {
        ...this.state.dataPos,
        detail: data,
      },
    });
    await this.setValueTotalNet();
  };

  setValueUnit = async (value, id) => {
    let data = this.state.dataPos.detail;
    data[id].unit = value;

    await this.setState({
      dataPos: {
        ...this.state.dataPos,
        detail: data,
      },
    });
  };

  setValueTotalNet = async () => {
    let data = this.state.dataPos.detail;
    if (data && data.length > 0) {
      let price = 0;
      let price_cost = 0;

      data.map((item, index) => {
        return (
          (price = price + item.total_price),
          (price_cost = price_cost + item.total_cost_price)
        );
      });
      await this.setState({
        dataPos: {
          ...this.state.dataPos,
          total_net: price,
          total_cost_price_net: price_cost,
        },
        isLoadData: false,
      });
    } else {
      await this.setState({
        dataPos: {
          ...this.state.dataPos,
          total_net: 0,
          total_cost_price_net: 0,
        },
        isLoadData: false,
      });
    }
  };

  deleteByID = async (index) => {
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
        let data = this.state.dataPos.detail;
        data.splice(index, 1);

        this.setState({
          dataPos: {
            ...this.state.dataPos,
            detail: data,
          },
        });
        await this.setValueTotalNet();
        await this.checkPrintBill();
      }
    });
  };

  deleteList = async (index) => {
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
        this.setState({
          dataPos: {
            ...this.state.dataPos,
            detail: [],
          },
        });
        await this.setValueTotalNet();
        await this.checkPrintBill();
      }
    });
  };

  validatePrintBill = async () => {
    const { dataPos, customer } = this.state;

    if (customer && customer !== "") {
      this.setState({
        isValidateCustomer: false,
      });
    } else {
      this.setState({
        isValidateCustomer: true,
      });
    }

    if (dataPos.detail.length > 0) {
      this.setState({
        isValidateDetail: false,
      });
    } else {
      this.setState({
        isValidateDetail: true,
      });
    }

    return;
  };

  checkPrintBill = async () => {
    await this.validatePrintBill();

    if (this.state.isValidateCustomer || this.state.isValidateDetail) {
      this.setState({
        isDisable: true,
      });
    } else {
      this.setState({
        isDisable: false,
      });
    }
  };

  printBill = async (status) => {
    await this.validatePrintBill();

    if (!this.state.isValidateCustomer && !this.state.isValidateDetail) {
      let body = {};
      this.setState({ loadingFull: true });

      let dataPos = this.state.dataPos;
      body.code_bill = dataPos.code_bill;
      body.sale_date = dataPos.sale_date;
      body.customer_code = dataPos.customer_code;
      body.customer_name = dataPos.customer_name;
      body.customer_address = dataPos.customer_address;
      body.customer_phone = dataPos.customer_phone;
      body.type_price = dataPos.type_price.value;
      body.detail = JSON.stringify(dataPos.detail);
      body.withholding_tax = dataPos.withholding_tax;
      body.discount = dataPos.discount;
      body.vat = dataPos.vat;
      body.total_net = dataPos.total_net;
      body.total_cost_price_net = dataPos.total_cost_price_net;
      body.status = status;
      body.real_sale = dataPos.real_sale;

      const { fetchUpdatePosByID } = this.props;
      let response = await fetchUpdatePosByID(this.props.posID, body);

      if (response) {
        let { status, data } = response;

        if (status === 200) {
          let detailNew = JSON.parse(body.detail);
          body.detail = detailNew;
          this.setState({
            dataPrint: body,
            message: data.message,
            isOpenModalSuccess: true,
            loadingFull: false,
          });
          return true;
        } else {
          this.setState({
            loadingFull: false,
            message: data.message,
            isOpenModalError: true,
          });
          return false;
        }
      } else {
        this.setState({
          loadingFull: false,
          message: "ไม่สามารถบันทึกข้อมูลได้",
          isOpenModalError: true,
        });
        return false;
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

  toggleIsOpenModalProduct = async () => {
    this.setState({
      // isOpenModalProduct: !this.state.isOpenModalProduct,
      dataProduct: [],
      product_code: "",
      product_name: "",
      categoryProduct: { value: "ทั้งหมด", label: "ทั้งหมด" },
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

    if (this.state.dataPos.detail.length === 0) {
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
        {this.state.dataPos.detail.length > 0 &&
          this.state.dataPos.detail.map((m, index) => {
            return (
              <tr
                id={"row" + index}
                key={index}
                className={
                  index % 2 === 0 ? "row-even pointer" : "row-odd pointer"
                }
              >
                <td className="textCenter">
                  <Button
                    className="color-theme-button pointer margin3"
                    onClick={() => this.deleteByID(index)}
                  >
                    <i className="fa fa-trash"></i> ลบ
                  </Button>
                </td>

                <td className="">
                  <Input
                    className="input"
                    type="text"
                    id="codeProductPos"
                    name="codeProductPos"
                    placeholder="รหัสสินค้า"
                    disabled
                    onChange={(event) => {}}
                    value={m.code}
                  />
                </td>
                <td className="">
                  <Input
                    className="input"
                    type="text"
                    id="nameProductPos"
                    name="nameProductPos"
                    placeholder="ชื่อสินค้า"
                    disabled
                    onChange={(event) => {}}
                    value={m.name}
                  />
                </td>

                <td className="textCenter">
                  <Input
                    className="input"
                    type="number"
                    id="amountProductPos"
                    name="amountProductPos"
                    placeholder="จำนวน"
                    onChange={(event) => {
                      if (event.target.value > 0) {
                        this.setValueAmount(event.target.value, index);
                      }
                    }}
                    value={m.amount}
                    style={{ textAlign: "right" }}
                  />
                </td>
                <td className="textCenter">
                  <Dropdown
                    name="unitProductPos"
                    id="unitProductPos"
                    className={"txt-search-input no-margin"}
                    options={this.state.dataUnit.map((p) => {
                      return {
                        value: p.name,
                        label: p.name,
                      };
                    })}
                    disabledInput={true}
                    onChange={async (option) => {
                      this.setValueUnit(option, index);
                    }}
                    value={m.unit}
                  />
                </td>
                <td className="textCenter">
                  <Input
                    className="input"
                    type="text"
                    id="salePriceProductPos"
                    name="salePriceProductPos"
                    placeholder="ราคาสินค้า"
                    // disabled
                    onChange={(event) => {
                      const regex = new RegExp(
                        "^[1-9]([0-9]?)+(\\.)?(\\d{1,2})?$"
                      );
                      let priceDeposit = event.target.value.replace(/,/g, "");
                      let priceCheckZero = new RegExp("^[0]?\\.+(\\d{1,2})?$");
                      if (priceDeposit.length > 1) {
                        if (regex.test(priceDeposit)) {
                          this.setValueSalePrice(priceDeposit, index);
                        } else if (priceCheckZero.test(priceDeposit)) {
                          this.setValueSalePrice(priceDeposit, index);
                        }
                      } else {
                        this.setValueSalePrice(priceDeposit, index);
                      }
                    }}
                    value={m.sale_price}
                    // value={NumberFormatToFixed(m.sale_price)}
                    style={{ textAlign: "right" }}
                  />
                </td>
                <td className="textCenter">
                  <Input
                    className="input"
                    type="text"
                    id="totalPriceProductPos"
                    name="totalPriceProductPos"
                    placeholder="ราคารวม"
                    disabled
                    value={NumberFormatToFixed(m.total_price)}
                    style={{ textAlign: "right" }}
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    );
  };

  LoadRowDataProduct = () => {
    if (this.state.isLoadDataProduct === true) {
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

    if (this.state.dataProduct.length === 0) {
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
        {this.state.dataProduct.map((item, index) => {
          return (
            <tr
              id={"row" + index}
              key={index}
              className={"textCenter pointer"}
              onClick={() => this.selectProductSearch(item, index)}
            >
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{item.unit}</td>
              <td>{item.category_product}</td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  render() {
    const { dataPos } = this.state;
    if (this.state.loadingFull) {
      return <LoadingFullScreen loading={this.state.loadingFull} />;
    }

    return (
      <React.Fragment>
        <Modal
          backdrop="static"
          className="loading-modal modal-lg"
          isOpen={this.state.isOpenModalProduct}
          toggle={() => {
            this.setState({
              isOpenModalProduct: false,
            });
            this.toggleIsOpenModalProduct();
          }}
        >
          <ModalBody className="container-modal-content-product">
            <Row
              style={{
                width: "100%",
                marginTop: "20px",
              }}
            >
              <Col sm={12} md={6} lg={6}>
                <Dropdown
                  name="categoryProduct"
                  id="categoryProduct"
                  className={"txt-search-input no-margin"}
                  options={this.state.dataCategoryProduct.map((p) => {
                    return {
                      value: p.name,
                      label: p.name,
                    };
                  })}
                  onChange={async (option) => {
                    this.setState({
                      categoryProduct: option,
                    });
                  }}
                  value={this.state.categoryProduct}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <FormGroup>
                  <InputGroup>
                    <Input
                      className="input"
                      type="text"
                      id="textSearchNameProductPos"
                      name="textSearchNameProductPos"
                      placeholder="ค้นหา ชื่อสินค้า"
                      onChange={(event) => {
                        this.setState({
                          product_name: event.target.value,
                        });
                      }}
                      value={this.state.product_name}
                      onKeyDown={async (event) => {
                        if (event.keyCode === 13) {
                          this.setState({ page: 1 });
                          await this.fetchSearchProduct(1);
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
                            this.setState({ page: 1 });
                            await this.fetchSearchProduct(1);
                          }}
                        />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            <Table responsive striped>
              <thead className="thead">
                <tr className="row-head">
                  <th className="th textCenter">รหัสสินค้า</th>
                  <th className="th textCenter">ชื่อสินค้า</th>
                  <th className="th textCenter">หน่วยสินค้า</th>
                  <th className="th textCenter">หมวดหมู่สินค้า</th>
                </tr>
              </thead>
              {this.LoadRowDataProduct()}
            </Table>

            <Col sm={12} md={12} lg={12} className="text-center">
              <center>
                <Paging
                  PageSize={PAGE_LIMIT}
                  Total={
                    this.state.dataProduct.length > 0
                      ? this.state.dataProductTotal
                      : 0
                  }
                  IsLoading={this.state.isLoadDataProduct}
                  PageActive={this.state.page}
                  onPageClick={(no) => {
                    this.setState({ page: no });
                    this.fetchSearchProduct(no);
                  }}
                />
              </center>
            </Col>

            <RoundButton
              className="btn-next mb-4"
              onClick={() => {
                this.setState({
                  isOpenModalProduct: false,
                });
                this.toggleIsOpenModalProduct();
              }}
            >
              ปิด
            </RoundButton>
          </ModalBody>
        </Modal>

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
              title={""}
              // title={
              //   (this.props.action === "Add"
              //     ? "เพิ่ม"
              //     : this.props.action === "View"
              //     ? "ดู"
              //     : "แก้ไข") + "รายการ"
              // }
              isBtnBack={true}
              onClick={this.props.toggle}
            />

            <div className="mb-15">
              <Row>
                <Col sm={12} md={4} lg={4}>
                  <Text.Span className="font-large blue bold mt-3 mb-15 text-pre-wrap">
                    {`วันที่ ${moment(new Date()).format("DD/MM/yyyy")}`}
                  </Text.Span>
                </Col>
                <Col sm={12} md={4} lg={4}>
                  <Text.Span className="font-large blue bold mt-3 mb-15 text-pre-wrap">
                    {`เลขที่บิล ${dataPos.code_bill}`}
                  </Text.Span>
                </Col>
                <Col sm={12} md={2} lg={2}>
                  <RoundButton
                    id="btAddSearch"
                    className="btn-next"
                    onClick={async () => {
                      await this.printBill("รอดำเนินการ");
                    }}
                    isDisable={this.state.isDisable}
                  >
                    บันทึกข้อมูล
                  </RoundButton>
                </Col>
                <Col sm={12} md={2} lg={2}>
                  <ReactToPrint content={() => this.componentRef}>
                    <PrintContextConsumer>
                      {({ handlePrint }) => (
                        <RoundButton
                          id="btAddSearch"
                          className="btn-next"
                          onClick={async () => {
                            await this.printBill("เสร็จสิ้น").then((result) => {
                              if (result === true) {
                                handlePrint();
                              }
                            });
                          }}
                          isDisable={this.state.isDisable}
                        >
                          พิมพ์
                        </RoundButton>
                      )}
                    </PrintContextConsumer>
                  </ReactToPrint>

                  <div style={{ display: "none" }}>
                    <PrintPos
                      ref={(el) => (this.componentRef = el)}
                      dataPrint={this.state.dataPrint}
                    />
                  </div>
                </Col>
              </Row>

              <div className="divCustomer">
                <Row>
                  <Col lg={12} md={12} xs={12}>
                    <FormGroup>
                      <Dropdown
                        name="customer"
                        id="customer"
                        className={"txt-search-input no-margin"}
                        options={this.state.dataCustomer.map((p) => {
                          return {
                            value: p.code,
                            label: p.code + "/" + p.name,
                          };
                        })}
                        onChange={async (option) => {
                          await this.setState({
                            customer: option,
                          });
                          await this.setValueCustomer(option);
                        }}
                        value={this.state.customer}
                        invalid={this.state.isValidateCustomer}
                      />
                      <FormFeedback
                        className="errorMessage"
                        style={{
                          display: this.state.isValidateCustomer
                            ? "block"
                            : "none",
                        }}
                      >
                        กรุณาระบุ ลูกค้า
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="mb-15">
                  <Col lg={4} md={4} xs={12}>
                    <Text.Span className="font-medium text-pre-wrap">
                      {`รหัสลูกค้า ${dataPos.customer_code}`}
                    </Text.Span>
                  </Col>
                  <Col lg={8} md={8} xs={12}>
                    <Text.Span className="font-medium text-pre-wrap">
                      {`ชื่อลูกค้า ${dataPos.customer_name}`}
                    </Text.Span>
                  </Col>
                </Row>
                <Row className="mb-15">
                  <Col lg={4} md={4} xs={12}>
                    <Text.Span className="font-medium text-pre-wrap">
                      {`เบอร์โทรศัพท์ ${dataPos.customer_phone}`}
                    </Text.Span>
                  </Col>
                  <Col lg={8} md={8} xs={12}>
                    <Text.Span className="font-medium text-pre-wrap">
                      {`ที่อยู่ ${dataPos.customer_address} `}
                    </Text.Span>
                  </Col>
                </Row>
              </div>

              <Row>
                <Col sm={12} md={3} lg={3}>
                  <FormGroup>
                    <Dropdown
                      name="typePrice"
                      id="unit"
                      className={"txt-search-input no-margin"}
                      options={this.state.dataTypePrice.map((p) => {
                        return {
                          value: p.name,
                          label: p.name,
                        };
                      })}
                      onChange={async (option) => {
                        await this.changeTypePrice(option);
                        await this.setState({
                          dataPos: {
                            ...this.state.dataPos,
                            type_price: option,
                          },
                        });
                      }}
                      value={dataPos.type_price}
                    />
                  </FormGroup>
                </Col>
                <Col sm={12} md={6} lg={6}>
                  <FormGroup>
                    <div>
                      <BarcodeReader
                        onError={this.handleError}
                        onScan={this.handleScanCodeProduct}
                      />
                    </div>
                    <InputGroup>
                      <Input
                        className="input"
                        type="text"
                        id="textSearchCodeProductPos"
                        name="textSearchCodeProductPos"
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
                <Col sm={12} md={3} lg={3}>
                  <RoundButton
                    id="btAddSearchProduct"
                    className="btn-next"
                    onClick={async () => {
                      this.setState({
                        isOpenModalProduct: true,
                      });
                      this.toggleIsOpenModalProduct();
                    }}
                  >
                    ค้นหาชื่อสินค้า
                  </RoundButton>
                </Col>
              </Row>
            </div>

            <Row className="mb-15">
              <Col sm={12} md={12} lg={12} style={{ textAlign: "right" }}>
                <Text.Span className="font-extra-large red bold text-pre-wrap">
                  {NumberFormatToFixed(this.state.dataPos.total_net)}
                </Text.Span>
              </Col>
            </Row>

            <Table>
              <thead className="thead">
                <tr className="row-head">
                  <th className="th textCenter" style={{ width: "2%" }}>
                    <Button
                      color="danger"
                      className="pointer margin3"
                      onClick={() => this.deleteList()}
                    >
                      <i className="fa fa-trash"></i> ลบทั้งหมด
                    </Button>
                  </th>
                  <th className="th textCenter" style={{ width: "20%" }}>
                    รหัสสินค้า
                  </th>
                  <th className="th textCenter" style={{ width: "25%" }}>
                    ชื่อสินค้า
                  </th>
                  <th className="th textCenter" style={{ width: "10%" }}>
                    จำนวนสินค้า
                  </th>
                  <th className="th textCenter" style={{ width: "13%" }}>
                    หน่วย
                  </th>
                  <th className="th textCenter" style={{ width: "13%" }}>
                    ราคา / หน่วย
                  </th>
                  <th className="th textCenter" style={{ width: "13%" }}>
                    รวมราคา
                  </th>
                </tr>
              </thead>
              {this.LoadRowData()}
              <tfoot>
                <tr>
                  <td colSpan={6} style={{ textAlign: "right" }}>
                    รวมราคาทั้งหมด
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {NumberFormatToFixed(this.state.dataPos.total_net)}
                  </td>
                </tr>
              </tfoot>
            </Table>
          </div>
        </div>
        <LoadingFullScreen loading={this.state.loadingFull} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchDataCustomerNoLimit: fetchDataCustomerNoLimit,
      fetchDataProduct: fetchDataProduct,
      fetchDataUnitNoLimit: fetchDataUnitNoLimit,
      fetchUpdatePosByID: fetchUpdatePosByID,
      fetchDataCategoryProductNoLimit: fetchDataCategoryProductNoLimit,
      fetchDataPosByID: fetchDataPosByID,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FormPos);
