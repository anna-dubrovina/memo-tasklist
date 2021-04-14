import React, { useState } from 'react';
import SideDrawer from '../Navigation/SideDrawer';
import Toolbar from '../Navigation/Toolbar';

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };
  return (
    <React.Fragment>
      <Toolbar clicked={sideDrawerToggleHandler} />
      <SideDrawer closed={sideDrawerClosedHandler} open={showSideDrawer} />
      <main className="container">{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
