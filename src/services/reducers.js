//set reducer to store
import { combineReducers } from "redux";
import Routes from "./Routes/reducer";
import Auth from "./Auth/reducer";
import Unit from "./Unit/reducer";
import Product from "./Product/reducer";
import Customer from "./Customer/reducer";
import Pos from "./Pos/reducer";
import UserManagement from "./UserManagement/reducer";
import CategoryProduct from "./CategoryProduct/reducer";

export default combineReducers({
  Routes: Routes,
  Auth: Auth,
  Unit: Unit,
  Product: Product,
  Customer: Customer,
  UserManagement: UserManagement,
  Pos: Pos,
  CategoryProduct: CategoryProduct,
});
