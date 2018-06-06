import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOut';
import { NavItem } from 'reactstrap';
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
	<div className="nav1">
		<h3 className="navtitle">Navigation</h3>
		<NavItem className="navitem">
			<Link
			className="nav1 navh" 
			to={routes.HOME}>Home</Link>
		</NavItem>
		<NavItem className="navitem">
			<Link 
			className="nav1 navi"
			to={routes.INSPIRATION}>Inspiration</Link>
		</NavItem>
		<NavItem className="navitem">
			<Link 
			className="nav1 navf"
			to={routes.FREEBIES}>Freebies</Link>
		</NavItem>
		<NavItem className="navitem">
			<Link
			className="nav1 nava" 
			to={routes.PASSWORD_CHANGE}>Password Change</Link>
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
			className="nav1 navh" 
			to={routes.HOME}>Home</Link>
		</NavItem>
		<NavItem className="navitem">
			<Link 
			className="nav1 navi"
			to={routes.INSPIRATION}>Inspiration</Link>
		</NavItem>
		<NavItem className="navitem">
			<a 
			className="nav1 navs"
			href='https://www.teacherspayteachers.com/Store/Misty-Weatherford'>Shop</a>
		</NavItem>
		<NavItem className="navitem">
			<Link 
			className="nav1 navf"
			to={routes.FREEBIES}>Freebies</Link>
		</NavItem>
		<NavItem className="bnavitem">
			<Link 
			className="nav1 navi"
			to={routes.SUBSCRIBE}>Subscribe!</Link>
		</NavItem> 	
	</div>  

export default Navigation;