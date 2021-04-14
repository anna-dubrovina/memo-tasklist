import { useHistory } from 'react-router-dom';
import DrawerToggle from './DrawerToggle';
import NavItem from './NavItem';
import Logo from '../UI/Logo';
import styles from './Toolbar.module.scss';

const Toolbar = (props) => {
  const history = useHistory();

  const logoClickHandler = () => history.push('/');

  return (
    <div className={styles.toolbar}>
      <DrawerToggle clicked={props.clicked} />
      <div className="container">
        <nav>
          <div onClick={logoClickHandler}>
            <Logo />
          </div>
          <ul>
            <NavItem link="/">Current Tasks</NavItem>
            <NavItem link="finished">Completed Tasks</NavItem>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Toolbar;
