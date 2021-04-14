import React from 'react';
import styles from './DrawerToggle.module.scss';

const DrawerToggle = (props) => {
  return (
    <div onClick={props.clicked} className={styles.drawerToggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DrawerToggle;
