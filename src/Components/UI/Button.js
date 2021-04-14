import styles from './Button.module.scss';

const Button = (props) => {
  return (
    <button
      className={[styles.btn, styles[props.btnType]].join(' ')}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
