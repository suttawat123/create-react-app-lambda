import React, { Component } from "react";
import { Row, Col, FormGroup, Input, Label, FormFeedback } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ModalError from "../../components/ModalError/index";
import LoadingFullScreen from "../../components/LoadingFullScreen";
import {
  fetchCreateProduct,
  fetchDataProductByID,
  fetchUpdateProductByID,
} from "../../services/Product/action";
import Dropdown from "../../components/Dropdown";
import LoadingSpin from "../../components/LoadingSpin";

import RoundButton from "../../components/Button/ButtonRound";
import { HeaderContent } from "../../components/HeaderContent";
import ModalSuccess from "../../components/ModalSuccess";

import "react-datepicker/dist/react-datepicker.css";
import "moment/locale/th";

import { fetchDataUnitNoLimit } from "../../services/Unit/action";
import { fetchDataCategoryProductNoLimit } from "../../services/CategoryProduct/action";

import BarcodeReader from "react-barcode-reader";

class FormProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadData: false,
      isOpen: false,
      loadingFull: false,

      dataProduct: {
        code: "",
        name: "",
        unit: "",
        category_product: "",
        cost_price: "",
        whole_sale_price: "",
        retail_price: "",
      },

      dataUnit: [],
      dataCategoryProduct: [],

      isValidateCode: false,
      isValidateName: false,
      isValidateUnit: false,
      isValidateCategoryProduct: false,
      isValidateCostPrice: false,
      isValidateWholeSalePrice: false,
      isValidateRetailPrice: false,

      message: "",
      isOpenModalSuccess: false,
      isOpenModalError: false,

      showPassword: false,
    };
    this.handleScanFormProduct = this.handleScanFormProduct.bind(this);
  }

  handleScanFormProduct = async (data) => {
    this.setState({
      dataProduct: {
        ...this.state.dataProduct,
        code: data,
      },
    });
  };

  handleError(err) {
    console.error(err);
  }

  componentDidMount = async () => {
    window.scrollTo(0, 0);

    if (this.props.action === "Edit") {
      this.setState({ isLoadData: true });
      await this.fetchDataUnit();
      await this.fetchDataCategoryProduct();
      await this.fetchDataProductByID();
    } else {
      this.setState({ isLoadData: true });
      await this.fetchDataUnit();
      await this.fetchDataCategoryProduct();
      this.setState({ isLoadData: false });
    }
  };

  componentWillUnmount = async () => {};

  fetchDataUnit = async () => {
    const { fetchDataUnitNoLimit } = this.props;
    let response = await fetchDataUnitNoLimit();
    let { status, data } = response;

    if (status === 200) {
      this.setState({
        dataUnit: data.result,
      });
    }
  };

  fetchDataCategoryProduct = async () => {
    const { fetchDataCategoryProductNoLimit } = this.props;
    let response = await fetchDataCategoryProductNoLimit();
    let { status, data } = response;

    if (status === 200) {
      this.setState({
        dataCategoryProduct: data.result,
      });
    }
  };

  fetchDataProductByID = async () => {
    const { fetchDataProductByID, productID } = this.props;

    let response = await fetchDataProductByID(productID);

    let { status, data } = response;

    if (status === 200) {
      this.setState({
        dataProduct: data.result[0],
      });

      if (data.result[0].unit) {
        this.setState({
          dataProduct: {
            ...this.state.dataProduct,
            unit: {
              label: data.result[0].unit,
              value: data.result[0].unit,
            },
          },
        });
      }

      if (data.result[0].category_product) {
        this.setState({
          dataProduct: {
            ...this.state.dataProduct,
            category_product: {
              label: data.result[0].category_product,
              value: data.result[0].category_product,
            },
          },
        });
      }

      this.setState({ isLoadData: false });
    } else {
      this.setState({ isLoadData: false });
    }
  };

  validateInput = async () => {
    const { dataProduct } = this.state;

    if (dataProduct.code && dataProduct.code !== "") {
      this.setState({
        isValidateCode: false,
      });
    } else {
      this.setState({
        isValidateCode: true,
      });
    }

    if (dataProduct.name && dataProduct.name !== "") {
      this.setState({
        isValidateName: false,
      });
    } else {
      this.setState({
        isValidateName: true,
      });
    }

    if (dataProduct.unit && dataProduct.unit !== "") {
      this.setState({
        isValidateUnit: false,
      });
    } else {
      this.setState({
        isValidateUnit: true,
      });
    }

    if (dataProduct.category_product && dataProduct.category_product !== "") {
      this.setState({
        isValidateCategoryProduct: false,
      });
    } else {
      this.setState({
        isValidateCategoryProduct: true,
      });
    }

    if (
      dataProduct.cost_price &&
      dataProduct.cost_price !== "" &&
      dataProduct.cost_price !== "-"
    ) {
      this.setState({
        isValidateCostPrice: false,
      });
    } else {
      this.setState({
        isValidateCostPrice: true,
      });
    }

    if (
      dataProduct.whole_sale_price &&
      dataProduct.whole_sale_price !== "" &&
      dataProduct.whole_sale_price !== "-"
    ) {
      this.setState({
        isValidateWholeSalePrice: false,
      });
    } else {
      this.setState({
        isValidateWholeSalePrice: true,
      });
    }

    if (
      dataProduct.retail_price &&
      dataProduct.retail_price !== "" &&
      dataProduct.retail_price !== "-"
    ) {
      this.setState({
        isValidateRetailPrice: false,
      });
    } else {
      this.setState({
        isValidateRetailPrice: true,
      });
    }

    if (
      dataProduct.retail_price &&
      dataProduct.retail_price !== "" &&
      dataProduct.retail_price !== "-"
    ) {
      this.setState({
        isValidateRetailPrice: false,
      });
    } else {
      this.setState({
        isValidateRetailPrice: true,
      });
    }

    if (
      dataProduct.whole_sale_price &&
      dataProduct.whole_sale_price !== "" &&
      dataProduct.whole_sale_price !== "-" &&
      dataProduct.cost_price &&
      dataProduct.cost_price !== "" &&
      dataProduct.cost_price !== "-" &&
      parseFloat(dataProduct.cost_price) <
        parseFloat(dataProduct.whole_sale_price)
    ) {
      this.setState({
        isValidateWholeSalePrice: false,
      });
    } else {
      this.setState({
        isValidateWholeSalePrice: true,
      });
    }

    if (
      dataProduct.retail_price &&
      dataProduct.retail_price !== "" &&
      dataProduct.retail_price !== "-" &&
      dataProduct.cost_price &&
      dataProduct.cost_price !== "" &&
      dataProduct.cost_price !== "-" &&
      parseFloat(dataProduct.cost_price) < parseFloat(dataProduct.retail_price)
    ) {
      this.setState({
        isValidateRetailPrice: false,
      });
    } else {
      this.setState({
        isValidateRetailPrice: true,
      });
    }

    return;
  };

  saveData = async () => {
    await this.validateInput();

    const {
      isValidateCode,
      isValidateName,
      isValidateUnit,
      isValidateCostPrice,
      isValidateWholeSalePrice,
      isValidateRetailPrice,
      isValidateCategoryProduct,
    } = this.state;

    if (
      !isValidateCode &&
      !isValidateName &&
      !isValidateUnit &&
      !isValidateCostPrice &&
      !isValidateWholeSalePrice &&
      !isValidateRetailPrice &&
      !isValidateCategoryProduct
    ) {
      let body = {};
      this.setState({ loadingFull: true });

      let dataProduct = this.state.dataProduct;
      body.category_product = dataProduct.category_product.value;
      body.unit = dataProduct.unit.value;
      body.code = dataProduct.code;
      body.name = dataProduct.name;
      body.cost_price = dataProduct.cost_price;
      body.whole_sale_price = dataProduct.whole_sale_price;
      body.retail_price = dataProduct.retail_price;

      const { fetchCreateProduct, fetchUpdateProductByID } = this.props;

      if (this.props.action === "Add") {
        let response = await fetchCreateProduct(body);

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
        let response = await fetchUpdateProductByID(dataProduct._id, body);

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

  setValueCostPrice = async (value) => {
    this.setState({
      dataProduct: {
        ...this.state.dataProduct,
        cost_price: value !== "" && value !== 0 ? value : 1,
      },
    });
  };

  setValueWholeSalePrice = async (value) => {
    this.setState({
      dataProduct: {
        ...this.state.dataProduct,
        whole_sale_price: value !== "" && value !== 0 ? value : 1,
      },
    });
  };

  setValueRetailPrice = async (value) => {
    this.setState({
      dataProduct: {
        ...this.state.dataProduct,
        retail_price: value !== "" && value !== 0 ? value : 1,
      },
    });
  };

  // readFile() {
  //   if (this.state.file) {
  //     var f = this.state.file;
  //     // var name = f.name;
  //     const reader = new FileReader();
  //     reader.onload = (evt) => {
  //       // evt = on_file_select event
  //       /* Parse data */
  //       const bstr = evt.target.result;
  //       const wb = XLSX.read(bstr, { type: "binary" });
  //       /* Get first worksheet */
  //       const wsName0 = wb.SheetNames[0];
  //       const wsName1 = wb.SheetNames[1];

  //       const ws0 = wb.Sheets[wsName0];
  //       const ws1 = wb.Sheets[wsName1];
  //       /* Convert array of arrays */
  //       const dataHeader = XLSX.utils.sheet_to_csv(ws0, { header: 1 });
  //       const dataHeaderPeriod = XLSX.utils.sheet_to_csv(ws1, { header: 1 });
  //       /* Update state */

  //       let dataHeaderJson = JSON.parse(this.convertToJson(dataHeader));
  //       let dataHeaderPeriodJson = JSON.parse(
  //         this.convertToJson(dataHeaderPeriod)
  //       );

  //       let dataPeriod = [];
  //       let indexDataPeriod = 0;

  //       dataHeaderPeriodJson.map((item, index) => {
  //         if (item.period && item.period !== "") {
  //           if (this.NumberOnly(item.no)) {
  //             if (item.period && item.period !== "") {
  //               indexDataPeriod = item.no - 1;
  //               dataPeriod.push({
  //                 period_name: item.period ? item.period : "",
  //                 max_percent: item.percent ? parseInt(item.percent) : 0,
  //                 sub_period: [],
  //               });
  //             }
  //           } else {
  //             let dateConvert = item.delivery_date.split("/");

  //             let dateConvertNew =
  //               dateConvert[1] + "/" + dateConvert[0] + "/" + dateConvert[2];

  //             if (item.period && item.period !== "") {
  //               dataPeriod[indexDataPeriod].sub_period.push({
  //                 sub_period_name: item.period ? item.period : "",
  //                 percent: item.percent ? parseInt(item.percent) : 0,
  //                 deadline: this.isValidDate(dateConvertNew)
  //                   ? new Date(dateConvertNew)
  //                   : new Date(),
  //                 done: false,
  //               });
  //             }
  //           }
  //         }
  //       });

  //       let dataOld = this.state.dataProduct.period;

  //       if (dataPeriod.length > 0) {
  //         dataPeriod.map((data) => {
  //           return dataOld.push(data);
  //         });
  //       }
  //       this.setState({
  //         dataProduct: {
  //           ...this.state.dataProduct,
  //           period: dataOld,
  //         },
  //       });

  //       dataHeaderJson.map((item, index) => {
  //         if (item.product_name && item.product_name !== "") {
  //           this.setState({
  //             dataProduct: {
  //               ...this.state.dataProduct,
  //               product_name: item.product_name,
  //             },
  //           });
  //         }

  //         if (item.province && item.province !== "") {
  //           this.setState({
  //             dataProduct: {
  //               ...this.state.dataProduct,
  //               province: {
  //                 label: item.province,
  //                 value: item.province,
  //               },
  //             },
  //           });
  //         }

  //         if (item.district && item.district !== "") {
  //           this.setState({
  //             dataProduct: {
  //               ...this.state.dataProduct,
  //               district: item.district,
  //             },
  //           });
  //         }

  //         if (item.sub_district && item.sub_district !== "") {
  //           this.setState({
  //             dataProduct: {
  //               ...this.state.dataProduct,
  //               sub_district: item.sub_district,
  //             },
  //           });
  //         }

  //         if (item.branch_manager && item.branch_manager !== "") {
  //           let data = this.state.dataBranchManager;
  //           let dataSearch = data.filter((c) => c.name === item.branch_manager);
  //           if (dataSearch && dataSearch.length > 0) {
  //             this.setState({
  //               dataProduct: {
  //                 ...this.state.dataProduct,
  //                 branch_manager: {
  //                   value: dataSearch[0]._id,
  //                   label: dataSearch[0].name,
  //                 },
  //               },
  //             });
  //           }
  //         }

  //         if (item.product_manager && item.product_manager !== "") {
  //           let data = this.state.dataProductManager;
  //           let dataSearch = data.filter(
  //             (c) => c.name === item.product_manager
  //           );
  //           if (dataSearch && dataSearch.length > 0) {
  //             this.setState({
  //               dataProduct: {
  //                 ...this.state.dataProduct,
  //                 product_manager: {
  //                   value: dataSearch[0]._id,
  //                   label: dataSearch[0].name,
  //                 },
  //               },
  //             });
  //           }
  //         }

  //         if (item.engineering && item.engineering !== "") {
  //           let data = this.state.dataEngineering;
  //           let dataSearch = data.filter((c) => c.name === item.engineering);
  //           if (dataSearch && dataSearch.length > 0) {
  //             this.setState({
  //               dataProduct: {
  //                 ...this.state.dataProduct,
  //                 engineering: {
  //                   value: dataSearch[0]._id,
  //                   label: dataSearch[0].name,
  //                 },
  //               },
  //             });
  //           }
  //         }

  //         if (item.engineer && item.engineer !== "") {
  //           let data = this.state.dataEngineer;
  //           let dataSearch = data.filter((c) => c.name === item.engineer);
  //           if (dataSearch && dataSearch.length > 0) {
  //             this.setState({
  //               dataProduct: {
  //                 ...this.state.dataProduct,
  //                 engineer: {
  //                   value: dataSearch[0]._id,
  //                   label: dataSearch[0].name,
  //                 },
  //               },
  //             });
  //           }
  //         }

  //         if (item.price && item.price !== "") {
  //           this.setState({
  //             dataProduct: {
  //               ...this.state.dataProduct,
  //               price: item.price,
  //             },
  //           });
  //         }

  //         if (item.start_date && item.start_date !== "") {
  //           let dateConvert = item.start_date.split("/");

  //           let dateConvertNew =
  //             dateConvert[1] + "/" + dateConvert[0] + "/" + dateConvert[2];

  //           this.setState({
  //             dataProduct: {
  //               ...this.state.dataProduct,
  //               start_date: this.isValidDate(dateConvertNew)
  //                 ? new Date(dateConvertNew)
  //                 : new Date(),
  //             },
  //           });
  //         }

  //         if (item.end_date && item.end_date !== "") {
  //           let dateConvert = item.end_date.split("/");

  //           let dateConvertNew =
  //             dateConvert[1] + "/" + dateConvert[0] + "/" + dateConvert[2];

  //           this.setState({
  //             dataProduct: {
  //               ...this.state.dataProduct,
  //               end_date: this.isValidDate(dateConvertNew)
  //                 ? new Date(dateConvertNew)
  //                 : new Date(),
  //             },
  //           });
  //         }

  //         if (item.contract_number && item.contract_number !== "") {
  //           this.setState({
  //             dataProduct: {
  //               ...this.state.dataProduct,
  //               contract_number: item.contract_number,
  //             },
  //           });
  //         }

  //         if (item.unit && item.unit !== "") {
  //           let data = this.state.dataUnit;
  //           let dataSearch = data.filter((c) => c.name === item.unit);
  //           if (dataSearch && dataSearch.length > 0) {
  //             this.setState({
  //               dataProduct: {
  //                 ...this.state.dataProduct,
  //                 unit: {
  //                   value: dataSearch[0].name,
  //                   label: dataSearch[0].name,
  //                 },
  //               },
  //             });
  //           }
  //         }
  //       });

  //       this.setState({ isLoadData: false });
  //     };

  //     reader.readAsBinaryString(f);
  //   }
  // }

  // convertToJson(csv) {
  //   this.setState({ isLoadData: true });
  //   var lines = csv.split("\n");

  //   var result = [];

  //   var headers = lines[0].split(",");

  //   for (var i = 1; i < lines.length; i++) {
  //     var obj = {};
  //     var currentLine = lines[i].split(",");

  //     for (var j = 0; j < headers.length; j++) {
  //       obj[headers[j]] = currentLine[j];
  //     }

  //     result.push(obj);
  //   }

  //   //return result; //JavaScript object
  //   return JSON.stringify(result); //JSON
  // }

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

    const { dataProduct } = this.state;
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
                  : "แก้ไข") + "สินค้า"
              }
              isBtnBack={true}
              onClick={this.props.toggle}
            />

            <div className="panel-search">
              <div>
                <BarcodeReader
                  onError={this.handleError}
                  onScan={this.handleScanFormProduct}
                />
              </div>

              {/* <Row className="d-flex justify-content-center mb-15">
                <Col lg={7} md={7} xs={7}>
                  <Input
                    className="input"
                    type="file"
                    id="file"
                    title="ชื่องวด"
                    ref="fileUploader"
                    onChange={this.changeFile.bind(this)}
                  />
                </Col>
                <Col lg={5} md={5} xs={5}>
                  <RoundButton
                    id="btAddSearch"
                    className="btn-next"
                    onClick={() => {
                      this.readFile();
                    }}
                  >
                    Read File
                  </RoundButton>
                </Col>
              </Row> */}
              <Row>
                <Col lg={6} md={6} xs={12}>
                  <FormGroup>
                    <Label htmlFor="code" className="label">
                      รหัสสินค้า
                    </Label>
                    <Input
                      autoComplete="off"
                      className="input"
                      type="text"
                      id="code"
                      name="code"
                      placeholder="รหัสสินค้า"
                      onChange={(event) => {
                        this.setState({
                          dataProduct: {
                            ...this.state.dataProduct,
                            code: event.target.value,
                          },
                        });
                      }}
                      value={dataProduct.code}
                      invalid={this.state.isValidateCode}
                    />
                    <FormFeedback
                      className="errorMessage"
                      style={{
                        display: this.state.isValidateCode ? "block" : "none",
                      }}
                    >
                      กรุณาระบุ รหัสสินค้า
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col lg={6} md={6} xs={12}>
                  <FormGroup>
                    <Label htmlFor="cost_price" className="label">
                      ราคาต้นทุน
                    </Label>
                    <Input
                      autoComplete="off"
                      className="input"
                      type="text"
                      id="cost_price"
                      name="cost_price"
                      placeholder="ราคาต้นทุน"
                      onChange={(event) => {
                        const regex = new RegExp(
                          "^[1-9]([0-9]?)+(\\.)?(\\d{1,2})?$"
                        );
                        let priceDeposit = event.target.value.replace(/,/g, "");
                        let priceCheckZero = new RegExp(
                          "^[0]?\\.+(\\d{1,2})?$"
                        );
                        if (priceDeposit.length > 1) {
                          if (regex.test(priceDeposit)) {
                            this.setValueCostPrice(priceDeposit);
                          } else if (priceCheckZero.test(priceDeposit)) {
                            this.setValueCostPrice(priceDeposit);
                          }
                        } else {
                          this.setValueCostPrice(priceDeposit);
                        }
                      }}
                      value={dataProduct.cost_price}
                      invalid={this.state.isValidateCostPrice}
                    />
                    <FormFeedback
                      className="errorMessage"
                      style={{
                        display: this.state.isValidateCostPrice
                          ? "block"
                          : "none",
                      }}
                    >
                      กรุณาระบุ ราคาต้นทุน
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={6} xs={12}>
                  <FormGroup>
                    <Label htmlFor="name" className="label">
                      ชื่อสินค้า
                    </Label>
                    <Input
                      autoComplete="off"
                      className="input"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="ชื่อสินค้า"
                      onChange={(event) => {
                        this.setState({
                          dataProduct: {
                            ...this.state.dataProduct,
                            name: event.target.value,
                          },
                        });
                      }}
                      value={dataProduct.name}
                      invalid={this.state.isValidateName}
                    />
                    <FormFeedback
                      className="errorMessage"
                      style={{
                        display: this.state.isValidateName ? "block" : "none",
                      }}
                    >
                      กรุณาระบุ ชื่อสินค้า
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col lg={6} md={6} xs={12}>
                  <FormGroup>
                    <Label htmlFor="whole_sale_price" className="label">
                      ราคาขายส่ง
                    </Label>
                    <Input
                      autoComplete="off"
                      className="input"
                      type="text"
                      id="whole_sale_price"
                      name="whole_sale_price"
                      placeholder="ราคาขายส่ง"
                      onChange={(event) => {
                        const regex = new RegExp(
                          "^[1-9]([0-9]?)+(\\.)?(\\d{1,2})?$"
                        );
                        let priceDeposit = event.target.value.replace(/,/g, "");
                        let priceCheckZero = new RegExp(
                          "^[0]?\\.+(\\d{1,2})?$"
                        );
                        if (priceDeposit.length > 1) {
                          if (regex.test(priceDeposit)) {
                            this.setValueWholeSalePrice(priceDeposit);
                          } else if (priceCheckZero.test(priceDeposit)) {
                            this.setValueWholeSalePrice(priceDeposit);
                          }
                        } else {
                          this.setValueWholeSalePrice(priceDeposit);
                        }
                      }}
                      value={dataProduct.whole_sale_price}
                      invalid={this.state.isValidateWholeSalePrice}
                    />
                    <FormFeedback
                      className="errorMessage"
                      style={{
                        display: this.state.isValidateWholeSalePrice
                          ? "block"
                          : "none",
                      }}
                    >
                      กรุณาระบุ ราคาขายส่ง
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={6} xs={12}>
                  <FormGroup>
                    <Label htmlFor="unit" className="label">
                      หน่วยสินค้า
                    </Label>
                    <Dropdown
                      name="unit"
                      id="unit"
                      className={"txt-search-input no-margin"}
                      options={this.state.dataUnit.map((p) => {
                        return {
                          value: p.name,
                          label: p.name,
                        };
                      })}
                      onChange={async (option) => {
                        this.setState({
                          dataProduct: {
                            ...this.state.dataProduct,
                            unit: option,
                          },
                        });
                      }}
                      value={dataProduct.unit}
                      invalid={this.state.isValidateUnit}
                    />
                    <FormFeedback
                      className="errorMessage"
                      style={{
                        display: this.state.isValidateUnit ? "block" : "none",
                      }}
                    >
                      กรุณาระบุ หน่วยสินค้า
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col lg={6} md={6} xs={12}>
                  <FormGroup>
                    <Label htmlFor="retail_price" className="label">
                      ราคาขายปลีก
                    </Label>
                    <Input
                      autoComplete="off"
                      className="input"
                      type="text"
                      id="retail_price"
                      name="retail_price"
                      placeholder="ราคาขายปลีก"
                      onChange={(event) => {
                        const regex = new RegExp(
                          "^[1-9]([0-9]?)+(\\.)?(\\d{1,2})?$"
                        );
                        let priceDeposit = event.target.value.replace(/,/g, "");
                        let priceCheckZero = new RegExp(
                          "^[0]?\\.+(\\d{1,2})?$"
                        );
                        if (priceDeposit.length > 1) {
                          if (regex.test(priceDeposit)) {
                            this.setValueRetailPrice(priceDeposit);
                          } else if (priceCheckZero.test(priceDeposit)) {
                            this.setValueRetailPrice(priceDeposit);
                          }
                        } else {
                          this.setValueRetailPrice(priceDeposit);
                        }
                      }}
                      value={dataProduct.retail_price}
                      invalid={this.state.isValidateRetailPrice}
                    />
                    <FormFeedback
                      className="errorMessage"
                      style={{
                        display: this.state.isValidateRetailPrice
                          ? "block"
                          : "none",
                      }}
                    >
                      กรุณาระบุ ราคาขายปลีก
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={6} xs={12}>
                  <FormGroup>
                    <Label htmlFor="unit" className="label">
                      หมวดหมู่สินค้า
                    </Label>
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
                          dataProduct: {
                            ...this.state.dataProduct,
                            category_product: option,
                          },
                        });
                      }}
                      value={dataProduct.category_product}
                      invalid={this.state.isValidateCategoryProduct}
                    />
                    <FormFeedback
                      className="errorMessage"
                      style={{
                        display: this.state.isValidateCategoryProduct
                          ? "block"
                          : "none",
                      }}
                    >
                      กรุณาระบุ หน่วยสินค้า
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>

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
      fetchDataProductByID: fetchDataProductByID,
      fetchCreateProduct: fetchCreateProduct,
      fetchUpdateProductByID: fetchUpdateProductByID,
      fetchDataUnitNoLimit: fetchDataUnitNoLimit,
      fetchDataCategoryProductNoLimit: fetchDataCategoryProductNoLimit,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FormProduct);
