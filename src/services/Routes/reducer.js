import {
  SET_ADMIN_MENU_ACTIVE,
  SET_AGENT_MENU_ACTIVE,
  SET_ADMIN_MENU_NAME,
  SET_FETCH_FAIL,
  SET_AGENT_GARAGE_MENU,
} from "./actionTypes";

//set default
const initialState = {
  Routes: {
    // First: { path: "/", name: "Login" }, //login
    Admin: { path: "/admin", name: "Admin Page" },
    Login: { path: "/login", name: "Login Page" }, //login
    RegisterSystem: { path: "/register", name: "สมัครสมาชิก" }, //สมัครสมาชิก
    ForgotPassword: { path: "/forgot-password", name: "ลืมรหัสผ่าน" }, //ลืมรหัสผ่าน
  },
  AdminRoutes: {},
  AdminRoutesActive: 0, //active menu admin
};

export default function Route(state = initialState, action) {
  switch (action.type) {
    //active admin menu
    case SET_ADMIN_MENU_ACTIVE:
      return {
        ...state,
        AdminRoutesActive: action.payload,
      };

    //set admin menu name
    case SET_ADMIN_MENU_NAME:
      let AdminRoutes = state.AdminRoutes;
      //eslint-disable-next-line
      action.payload.map((m) => {
        switch (m.menuurl) {
          case AdminRoutes.AgentProfileList.path:
            AdminRoutes.AgentProfileList.name = m.menudesc;
            break;

          case AdminRoutes.AgentMemberList.path:
            AdminRoutes.AgentMemberList.name = m.menudesc;
            break;

          case AdminRoutes.AgentTransferList.path:
            AdminRoutes.AgentTransferList.name = m.menudesc;
            break;

          case AdminRoutes.AgentVerifyUppdateMemberList.path:
            AdminRoutes.AgentVerifyUppdateMemberList.name = m.menudesc;
            break;

          case AdminRoutes.DocumentManagement.path:
            AdminRoutes.DocumentManagement.name = m.menudesc;
            break;

          case AdminRoutes.ConsentManagement.path:
            AdminRoutes.ConsentManagement.name = m.menudesc;
            break;

          default:
            break;
        }
      });

      return {
        ...state,
        AdminRoutes: AdminRoutes,
      };

    //active agent menu
    case SET_AGENT_MENU_ACTIVE:
      return {
        ...state,
        AgentRoutesActive: action.payload,
      };

    case SET_FETCH_FAIL:
      return {
        ...state,
        FetchFail: { ...state.FetchFail, ...action.payload },
      };

    case SET_AGENT_GARAGE_MENU:
      let garageMenu = action.payload;
      let { AgentRoutes } = state;
      AgentRoutes.GarageInfo.path = garageMenu
        ? garageMenu
        : AgentRoutes.GarageInfo.path;
      return {
        ...state,
        AgentRoutes: AgentRoutes,
      };
    default:
      return state;
  }
}
