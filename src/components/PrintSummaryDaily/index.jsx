import moment from "moment";
import React, { Component } from "react";
import { Table } from "reactstrap";
import { NumberFormatToFixed } from "../../services/Helpers/function";
import { Text } from "../Text";
import "./index.css";

export class PrintSummaryDaily extends Component {
  render() {
    const { dataPrint } = this.props;

    let summaryCostPrice = 0;

    return (
      <div className="invoice-box">
        <table cellSpacing="0" cellPadding="0">
          <tbody className="borderTableNone">
            <tr>
              <td>
                <Text.Span className="font-extra-large">วิชัย พานิช</Text.Span>
                <br />
                <Text.Span className="font-large">
                  หน้าตลาดสดอำเภอกมลาไสย จ.กาฬสินธุ์
                </Text.Span>
                <br />
                <Text.Span className="font-large">โทร. 091-542-9451</Text.Span>
              </td>

              <td>
                <Text.Span className="font-large">
                  รายงานสรุปสินค้าที่จำหน่ายรายวัน
                </Text.Span>
                <br />
                <Text.Span className="font-large">
                  {`ข้อมูลการขายวันที่ ${moment(
                    new Date(dataPrint.sale_date)
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
              <th className="th textCenter fontSize16" style={{ width: "15%" }}>
                <Text.Span className="font-medium">รหัสสินค้า</Text.Span>
              </th>
              <th className="th textCenter fontSize16" style={{ width: "20%" }}>
                <Text.Span className="font-medium">ชื่อสินค้า</Text.Span>
              </th>
              <th className="th textCenter fontSize16" style={{ width: "13%" }}>
                <Text.Span className="font-medium">จำนวนสินค้า</Text.Span>
              </th>
              <th className="th textCenter fontSize16" style={{ width: "13%" }}>
                <Text.Span className="font-medium">หน่วย</Text.Span>
              </th>
              <th className="th textCenter fontSize16" style={{ width: "13%" }}>
                <Text.Span className="font-medium">ราคาทุน</Text.Span>
              </th>
              <th className="th textCenter fontSize16" style={{ width: "13%" }}>
                <Text.Span className="font-medium">ราคา / หน่วย</Text.Span>
              </th>
              <th className="th textCenter fontSize16" style={{ width: "13%" }}>
                <Text.Span className="font-medium">รวมราคา</Text.Span>
              </th>
            </tr>
          </thead>
          <tbody className="animated fadeIn">
            {dataPrint.detail &&
              dataPrint.detail.map((item, index) => {
                summaryCostPrice = item.cost_price + summaryCostPrice;
                return (
                  <tr id={"row" + index} key={index}>
                    <td style={{ textAlign: "left" }}>
                      <Text.Span className="font-medium">{item.code}</Text.Span>
                    </td>
                    <td style={{ textAlign: "left" }}>
                      <Text.Span className="font-medium">{item.name}</Text.Span>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <Text.Span className="font-medium">
                        {item.amount}
                      </Text.Span>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <Text.Span className="font-medium">
                        {item.unit.value}
                      </Text.Span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Text.Span className="font-medium">
                        {NumberFormatToFixed(item.cost_price)}
                      </Text.Span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Text.Span className="font-medium">
                        {NumberFormatToFixed(item.sale_price)}
                      </Text.Span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Text.Span className="font-medium">
                        {NumberFormatToFixed(item.total_price)}
                      </Text.Span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <tr style={{ border: "none" }}>
              <td colSpan={4} style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">รวม</Text.Span>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">
                  {NumberFormatToFixed(dataPrint.total_cost_price_net)}
                </Text.Span>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">
                  {NumberFormatToFixed(dataPrint.total_net)}
                </Text.Span>
              </td>
              <td colSpan={2} style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">
                  {NumberFormatToFixed(dataPrint.total_net)}
                </Text.Span>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    );
  }
}
