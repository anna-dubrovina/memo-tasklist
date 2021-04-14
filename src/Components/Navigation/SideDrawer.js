import React from 'react';
import NavItem from './/NavItem';
import Backdrop from '../UI/Backdrop';
import Logo from '../UI/Logo';
import styles from './SideDrawer.module.scss';


const SideDrawer = (props) => {
  let attachedClasses = [styles.sideDrawer, styles.close];

  if (props.open) {
    attachedClasses = [styles.sideDrawer, styles.open];
  }

  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>
        <nav onClick={props.closed}>
          <ul>
            <NavItem link="/">Current Tasks</NavItem>
            <NavItem link="finished">Completed Tasks</NavItem>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
