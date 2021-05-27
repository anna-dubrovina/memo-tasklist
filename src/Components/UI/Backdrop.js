import ReactDOM from 'react-dom';
import styles from './Backdrop.module.scss';

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    props.show ? (
      <div className={styles.backdrop} onClick={props.clicked}></div>
    ) : null,
    document.getElementById('backdrop')
  );
};

export default Backdrop;
