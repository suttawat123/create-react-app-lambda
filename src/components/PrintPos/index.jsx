import moment from "moment";
import React, { Component } from "react";
import { Table } from "reactstrap";
import { NumberFormatToFixed } from "../../services/Helpers/function";
import { Text } from "../Text";
import "./index.css";

export class PrintPos extends Component {
  render() {
    const { dataPrint } = this.props;

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
                  ใบเสร็จรับเงิน / ใบส่งสินค้า
                </Text.Span>
                <br />
                <Text.Span className="font-large">
                  {`วันที่ ${moment(new Date(dataPrint.sale_date)).format(
                    "DD/MM/yyyy"
                  )}`}{" "}
                </Text.Span>
                <br />
                <Text.Span className="font-large">{`เลขที่บิล ${dataPrint.code_bill}`}</Text.Span>
              </td>
            </tr>
          </tbody>
        </table>

        <table cellSpacing="0" cellPadding="0" style={{ marginTop: 20 }}>
          <tbody className="borderTableNone">
            <tr>
              <td>
                <Text.Span className="font-large">
                  ชื่อลูกค้า : {dataPrint.customer_name}
                </Text.Span>
                <br />
                <Text.Span className="font-large">
                  เบอร์ติดต่อ : {dataPrint.customer_phone}
                </Text.Span>
                <br />
                <Text.Span className="font-large">
                  ที่อยู่ : {dataPrint.customer_address}
                </Text.Span>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <Table style={{ marginTop: 30 }}>
          <thead className="thead">
            <tr className="row-head">
              <th className="th textCenter" style={{ width: "20%" }}>
                <Text.Span className="font-medium">รหัสสินค้า</Text.Span>
              </th>
              <th className="th textCenter" style={{ width: "25%" }}>
                <Text.Span className="font-medium"> ชื่อสินค้า</Text.Span>
              </th>
              <th className="th textCenter" style={{ width: "15%" }}>
                <Text.Span className="font-medium">จำนวนสินค้า</Text.Span>
              </th>
              <th className="th textCenter" style={{ width: "10%" }}>
                <Text.Span className="font-medium">หน่วย</Text.Span>
              </th>
              <th className="th textCenter" style={{ width: "15%" }}>
                <Text.Span className="font-medium">ราคา / หน่วย</Text.Span>
              </th>
              <th className="th textCenter" style={{ width: "15%" }}>
                <Text.Span className="font-medium">รวมราคา</Text.Span>
              </th>
            </tr>
          </thead>
          <tbody className="animated fadeIn">
            {dataPrint.detail &&
              dataPrint.detail.map((item, index) => {
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
          {/* <tfoot>
            <tr style={{ border: "none" }}>
              <td colSpan={4} style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">ยอดรวม</Text.Span>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">
                  {NumberFormatToFixed(dataPrint.total_net)}
                </Text.Span>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">บาท</Text.Span>
              </td>
            </tr>
            <tr style={{ border: "none" }}>
              <td colSpan={4} style={{ textAlign: "right" }}>
                <Text.Span className="font-medium"> มูลค่าสินค้า</Text.Span>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">-</Text.Span>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">บาท</Text.Span>
              </td>
            </tr>
            <tr style={{ border: "none" }}>
              <td colSpan={4} style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">ภาษีมูลค่าเพิ่ม</Text.Span>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">-</Text.Span>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">บาท</Text.Span>
              </td>
            </tr>
            <tr style={{ border: "none" }}>
              <td colSpan={4} style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">รวมราคาทั้งหมด</Text.Span>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">
                  {NumberFormatToFixed(dataPrint.total_net)}
                </Text.Span>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">บาท</Text.Span>
              </td>
            </tr>
          </tfoot> */}
        </Table>

        <Table>
          <thead className="thead" style={{ border: "none" }}>
            <tr className="row-head">
              <th className="th textCenter" style={{ width: "20%" }}></th>
              <th className="th textCenter" style={{ width: "25%" }}></th>
              <th className="th textCenter" style={{ width: "15%" }}></th>
              <th className="th textCenter" style={{ width: "10%" }}></th>
              <th className="th textCenter" style={{ width: "15%" }}></th>
              <th className="th textCenter" style={{ width: "15%" }}></th>
            </tr>
          </thead>

          <tfoot>
            <tr style={{ border: "none" }}>
              <td colSpan={4} style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">ยอดรวม</Text.Span>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">
                  {NumberFormatToFixed(dataPrint.total_net)}
                </Text.Span>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">บาท</Text.Span>
              </td>
            </tr>
            <tr style={{ border: "none" }}>
              <td colSpan={4} style={{ textAlign: "right" }}>
                <Text.Span className="font-medium"> มูลค่าสินค้า</Text.Span>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">-</Text.Span>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">บาท</Text.Span>
              </td>
            </tr>
            <tr style={{ border: "none" }}>
              <td colSpan={4} style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">ภาษีมูลค่าเพิ่ม</Text.Span>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">-</Text.Span>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">บาท</Text.Span>
              </td>
            </tr>
            <tr style={{ border: "none" }}>
              <td colSpan={4} style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">รวมราคาทั้งหมด</Text.Span>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">
                  {NumberFormatToFixed(dataPrint.total_net)}
                </Text.Span>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text.Span className="font-medium">บาท</Text.Span>
              </td>
            </tr>
          </tfoot>
        </Table>

        <div className="row" style={{ marginTop: 40 }}>
          <div style={{ width: "50%", textAlign: "center" }}>
            ............................. <br />
            <Text.Span className="font-large">ผู้รับสินค้า</Text.Span>
          </div>
          <div style={{ width: "50%", textAlign: "center" }}>
            ............................. <br />
            <Text.Span className="font-large">ผู้ส่งสินค้า</Text.Span>
          </div>
        </div>
      </div>
    );
  }
}
