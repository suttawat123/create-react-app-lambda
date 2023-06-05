import React from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  Collapse,
  UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
} from "reactstrap";

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logodarkicon from "../../assets/images/logo-icon.png";
// import logolighticon from "../../assets/images/logo-light-icon.png";
// import logodarktext from "../../assets/images/logo-text.png";
// import logolighttext from "../../assets/images/logo-light-text.png";

const Header = () => {
  /*--------------------------------------------------------------------------------*/
  /*To open SIDEBAR-MENU in MOBILE VIEW                                             */
  /*--------------------------------------------------------------------------------*/
  const showMobileMenu = () => {
    document.getElementById("main-wrapper").classList.toggle("show-sidebar");
  };

  return (
    <header className="topbar navbarbg" data-navbarbg="skin1">
      <Navbar className="top-navbar" dark expand="md">
        <div className="navbar-header" id="logobg" data-logobg="skin6">
          {/*--------------------------------------------------------------------------------*/}
          {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
          {/*--------------------------------------------------------------------------------*/}
          <NavbarBrand href="/">
            <b className="logo-icon">
              <img src={logodarkicon} alt="homepage" className="dark-logo" />
              {/* <img src={logolighticon} alt="homepage" className="light-logo" /> */}
            </b>
            <span className="logo-text">
              <h1 className="dark-logo">POS Market</h1>
              {/* <img src={logodarktext} alt="homepage" className="dark-logo" /> */}
              {/* <img src={logolighttext} className="light-logo" alt="homepage" /> */}
            </span>
          </NavbarBrand>
          {/*--------------------------------------------------------------------------------*/}
          {/* Mobile View Toggler  [visible only after 768px screen]                         */}
          {/*--------------------------------------------------------------------------------*/}
          <button
            className="btn-link nav-toggler d-block d-md-none"
            onClick={() => showMobileMenu()}
          >
            <i className="ti-menu ti-close" />
          </button>
        </div>
        <Collapse className="navbarbg" navbar data-navbarbg="skin1">
          <Nav className="ml-auto float-right" navbar>
            {/*--------------------------------------------------------------------------------*/}
            {/* Start Profile Dropdown                                                         */}
            {/*--------------------------------------------------------------------------------*/}
            <UncontrolledDropdown nav inNavbar>
              {/* <DropdownToggle href="/logout" className="pro-pic no-color">
                <i href="/logout" className="fa fa-power-off mr-1 ml-1" /> ออกจากระบบ
              </DropdownToggle> */}
              {/* <DropdownMenu right className="user-dd">
                <DropdownItem href="/logout">
                  <i className="fa fa-power-off mr-1 ml-1" /> ออกจากระบบ
                </DropdownItem>
              </DropdownMenu> */}
            </UncontrolledDropdown>

            {/*--------------------------------------------------------------------------------*/}
            {/* End Profile Dropdown                                                           */}
            {/*--------------------------------------------------------------------------------*/}
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};
export default Header;
