import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';
import styles from './Modal.module.scss';

const Modal = (props) => {
  return ReactDOM.createPortal(
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={styles.modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
        }}
      >
        {props.children}
      </div>
    </React.Fragment>,
    document.getElementById('modal')
  );
};

export default Modal;
