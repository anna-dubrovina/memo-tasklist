import React, { useState } from 'react';
import SideDrawer from '../Navigation/SideDrawer';
import Toolbar from '../Navigation/Toolbar';
import Logo from '../UI/Logo';

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
      <header>
        <Toolbar clicked={sideDrawerToggleHandler} />
        <SideDrawer closed={sideDrawerClosedHandler} open={showSideDrawer} />
      </header>
      <main className="container">{props.children}</main>
      <footer>
        <p>
          Memo Task List by Anna Dubrovina. All Rights Reserved, &copy;{' '}
          {new Date().getFullYear()}
        </p>
        <p>
          Icons taken from
          <a href="https://www.flaticon.com/" title="Flaticon">
            {' '}
            www.flaticon.com
          </a>
        </p>
      </footer>
    </React.Fragment>
  );
};

export default Layout;
