import React, { Component } from "react";
import { Row, Col, Table } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoadingFullScreen from "../../components/LoadingFullScreen";
import { fetchDataUnitNoLimit } from "../../services/Unit/action";
import RoundButton from "../../components/Button/ButtonRound";
import moment from "moment";
import { NumberFormatToFixed } from "../../services/Helpers/function";
import { Text } from "../../components/Text";
import { fetchDataCustomerNoLimit } from "../../services/Customer/action";
import { fetchDataProduct } from "../../services/Product/action";
import {
  fetchUpdatePosByID,
  fetchDataPosByID,
} from "../../services/Pos/action";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { fetchDataCategoryProductNoLimit } from "../../services/CategoryProduct/action";
import { HeaderContent } from "../../components/HeaderContent";
import { PrintSummaryDaily } from "../../components/PrintSummaryDaily";

class FormReportSummaryDaily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadData: false,
      isLoadDataProduct: false,
      loadingFull: false,

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
      },

      dataPrint: {},
    };
  }

  componentDidMount = async () => {
    window.scrollTo(0, 0);

    this.setState({
      loadingFull: true,
    });

    await this.fetchDataPosByID();
  };

  componentWillUnmount = async () => {};

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

        this.setState({ loadingFull: false });
      } else {
        this.setState({ loadingFull: false });
      }
    } else {
      this.setState({ loadingFull: false });
    }
  };

  render() {
    let summaryCostPrice = 0;
    const { dataPos } = this.state;
    if (this.state.loadingFull) {
      return <LoadingFullScreen loading={this.state.loadingFull} />;
    }

    return (
      <React.Fragment>
        <div className="animated fadeIn">
          <div className="panel">
            <HeaderContent
              className="screen-header-content"
              title={""}
              isBtnBack={true}
              onClick={this.props.toggle}
            />

            <div className="mb-15">
              <Row>
                <Col sm={12} md={2} lg={2}>
                  <ReactToPrint content={() => this.componentRef}>
                    <PrintContextConsumer>
                      {({ handlePrint }) => (
                        <RoundButton
                          id="btAddSearch"
                          className="btn-next"
                          onClick={async () => {
                            await handlePrint();
                          }}
                        >
                          พิมพ์
                        </RoundButton>
                      )}
                    </PrintContextConsumer>
                  </ReactToPrint>

                  <div style={{ display: "none" }}>
                    <PrintSummaryDaily
                      ref={(el) => (this.componentRef = el)}
                      dataPrint={this.state.dataPos}
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <div className="invoice-box">
              <table cellSpacing="0" cellPadding="0">
                <tbody className="borderTableNone">
                  <tr>
                    <td>
                      <Text.Span className="font-extra-large">
                        วิชัย พานิช
                      </Text.Span>
                      <br />
                      <Text.Span className="font-large">
                        หน้าตลาดสดอำเภอกมลาไสย จ.กาฬสินธุ์
                      </Text.Span>
                      <br />
                      <Text.Span className="font-large">
                        โทร. 091-542-9451
                      </Text.Span>
                    </td>

                    <td>
                      <Text.Span className="font-large">
                        รายงานสรุปสินค้าที่จำหน่ายรายวัน
                      </Text.Span>
                      <br />
                      <Text.Span className="font-large">
                        {`ข้อมูลการขายวันที่ ${moment(
                          new Date(dataPos.sale_date)
                        ).format("DD/MM/yyyy")}`}
                      </Text.Span>
                      <br />
                      <Text.Span className="font-large">{`วันที่ออกรายงาน ${moment(
                        new Date()
                      ).format("DD/MM/yyyy HH:mm:ss")}`}</Text.Span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <Table style={{ marginTop: 30 }}>
                <thead className="thead">
                  <tr className="row-head">
                    <th className="th textCenter" style={{ width: "15%" }}>
                      รหัสสินค้า
                    </th>
                    <th className="th textCenter" style={{ width: "20%" }}>
                      ชื่อสินค้า
                    </th>
                    <th className="th textCenter" style={{ width: "13%" }}>
                      จำนวนสินค้า
                    </th>
                    <th className="th textCenter" style={{ width: "13%" }}>
                      หน่วย
                    </th>
                    <th className="th textCenter" style={{ width: "13%" }}>
                      ราคาทุน
                    </th>
                    <th className="th textCenter" style={{ width: "13%" }}>
                      ราคา / หน่วย
                    </th>
                    <th className="th textCenter" style={{ width: "13%" }}>
                      รวมราคา
                    </th>
                  </tr>
                </thead>
                <tbody className="animated fadeIn">
                  {dataPos.detail &&
                    dataPos.detail.map((item, index) => {
                      summaryCostPrice = item.cost_price + summaryCostPrice;
                      return (
                        <tr id={"row" + index} key={index}>
                          <td style={{ textAlign: "left" }}>{item.code}</td>
                          <td style={{ textAlign: "left" }}>{item.name}</td>
                          <td style={{ textAlign: "center" }}>{item.amount}</td>
                          <td style={{ textAlign: "center" }}>
                            {item.unit.value}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            {NumberFormatToFixed(item.cost_price)}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            {NumberFormatToFixed(item.sale_price)}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            {NumberFormatToFixed(item.total_price)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
                <tfoot>
                  <tr style={{ border: "none" }}>
                    <td colSpan={4} style={{ textAlign: "right" }}>
                      รวม
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {NumberFormatToFixed(dataPos.total_cost_price_net)}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {NumberFormatToFixed(dataPos.total_net)}
                    </td>
                    <td colSpan={2} style={{ textAlign: "right" }}>
                      {NumberFormatToFixed(dataPos.total_net)}
                    </td>

                    {/* <td style={{ textAlign: "right" }}>บาท</td> */}
                  </tr>
                </tfoot>
              </Table>
            </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormReportSummaryDaily);
