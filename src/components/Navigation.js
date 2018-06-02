import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOut';
import { NavItem, NavLink} from 'reactstrap';
import './App.css';

import * as routes from '../constants/routes';

const Navigation = ({authUser}) =>
  <div>
    { authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </div>
  
const NavigationAuth = () => 
	<div className="nav">
		<h3 className="navtitle">Navigation</h3>
		<NavItem className="navitem">
			<Link to={routes.HOME}>Home</Link>
		</NavItem>
		<NavItem className="navitem">
			<Link to={routes.ACCOUNT}>Account</Link>
		</NavItem>
		<NavItem className="navitem">
			<SignOutButton />
		</NavItem>
	</div>			

const NavigationNonAuth = () =>
	<div className="nav">
		<h3 className="navtitle">Navigation</h3>
		<NavItem className="navitem">
			<Link to={routes.HOME}>Home</Link>
		</NavItem>
		<NavItem className="navitem">
			<NavLink href='#'>Inspiration</NavLink>
		</NavItem>
		<NavItem className="navitem">
			<NavLink href='#'>Shop</NavLink>
		</NavItem>
		<NavItem className="navitem">
			<Link to="">Freebies</Link>
		</NavItem>
		<NavItem className="bnavitem">
			<Link to="">Subscribe!</Link>
		</NavItem>
	</div>  

export default Navigation;