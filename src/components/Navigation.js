import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOut';
import { NavItem, NavLink} from 'reactstrap';
import './App.css';

import * as routes from '../constants/routes';

const Navigation = ({authUser}) =>
  <div className="nav">
    { authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </div>
  
const NavigationAuth = () => 
	<div>
		<h3 className="navtitle">Navigation</h3>
		<NavItem className="navitem">
			<Link
			className="nav1" 
			to={routes.HOME}>Home</Link>
		</NavItem>
		<NavItem className="navitem">
			<Link
			className="nav1" 
			to={routes.ACCOUNT}>Account</Link>
		</NavItem>
		<NavItem className="navbut">
			<SignOutButton />
		</NavItem>
	</div>			

const NavigationNonAuth = () =>
	<div className="nav1">
		<h3 className="navtitle">Navigation</h3>
		<NavItem className="navitem">
			<Link
			className="nav1" 
			to={routes.HOME}>Home</Link>
		</NavItem>
		<NavItem className="navitem">
			<Link 
			className="nav1"
			to={routes.INSPIRATION}>Inspiration</Link>
		</NavItem>
		<NavItem className="navitem">
			<NavLink 
			className="nav1"
			href='https://www.teacherspayteachers.com/Store/Misty-Weatherford'>Shop</NavLink>
		</NavItem>
		<NavItem className="navitem">
			<Link 
			className="nav1"
			to={routes.FREEBIES}>Freebies</Link>
		</NavItem>
		<NavItem className="bnavitem">
			<Link 
			className="nav1"
			to={routes.SUBSCRIBE}>Subscribe!</Link>
		</NavItem> 	
	</div>  

export default Navigation;