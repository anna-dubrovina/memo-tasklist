import logo from '../../assets/logo-1.png';
import styles from './Logo.module.scss';

const Logo = (props) => (
  <img className={styles.logo} src={logo} alt="App Logo" />
);

export default Logo;
