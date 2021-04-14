import { NavLink } from 'react-router-dom';

const NavItem = (props) => {
  return (
    <li>
      <NavLink to={props.link} exact activeClassName="active">
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavItem;
