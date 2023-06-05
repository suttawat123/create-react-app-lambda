// import UserManagement from "../views/UserManagement/index.jsx";
import Unit from "../views/Unit/index.jsx";
import Logout from "../views/Logout/index.jsx";
import Pos from "../views/Pos/index.jsx";
import Customer from "../views/Customer/index.jsx";
import Product from "../views/Product/index.jsx";
import ReportPos from "../views/ReportPos/index.jsx";
import CategoryProduct from "../views/CategoryProduct/index.jsx";
import PosTaxInvoice from "../views/PosTaxInvoice/index.jsx";
import ReportSummaryDaily from "../views/ReportSummaryDaily/index.jsx";

var ThemeRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "แดชบอร์ด",
  //   icon: "ti-pie-chart",
  //   component: Dashboard,
  // },
  // {
  //   path: "/project",
  //   name: "โครงการ",
  //   icon: "ti-write",
  //   component: Project,
  // },
  // {
  //   path: "/news",
  //   name: "ข่าวสาร",
  //   icon: "ti-comment",
  //   component: News,
  // },

  {
    path: "/pos",
    name: "ระบบขายหน้าร้าน",
    icon: "ti-home",
    component: Pos,
  },
  {
    path: "/report",
    name: "ประวัติการขาย",
    icon: "ti-receipt",
    component: ReportPos,
  },
  {
    path: "/tax-invoice",
    name: "ออกใบกำกับภาษี",
    icon: "ti-receipt",
    component: PosTaxInvoice,
  },
  {
    path: "/summary-daily",
    name: "สรุปรายการรายวัน",
    icon: "ti-receipt",
    component: ReportSummaryDaily,
  },
  {
    path: "/product",
    name: "ข้อมูลสินค้า",
    icon: "ti-package",
    component: Product,
  },
  {
    path: "/customer",
    name: "ข้อมูลลูกค้า",
    icon: "ti-user",
    component: Customer,
  },
  {
    path: "/unit",
    name: "ข้อมูลหน่วยสินค้า",
    icon: "ti-view-list",
    component: Unit,
  },
  {
    path: "/category_product",
    name: "ข้อมูลหมวดหมู่สินค้า",
    icon: "ti-view-list",
    component: CategoryProduct,
  },
  // {
  //   path: "/user-management",
  //   name: "User Management",
  //   icon: "ti-settings",
  //   component: UserManagement,
  // },
  {
    path: "/logout",
    name: "ออกจากระบบ",
    icon: "ti-share-alt",
    component: Logout,
  },
  { path: "/", pathTo: "/pos", name: "Pos", redirect: true },
];
export default ThemeRoutes;
