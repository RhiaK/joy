import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import { Container, Row, Col } from 'reactstrap';

const Footer = () =>
  	<Container className="footer">
  		<Row>
  			<Col className="signin">
  				<Link to={routes.SIGN_IN}>Sign In</Link>
  			</Col>
  			<Col className="copy">
  				<p>© 2018 The Joyfilled Teacher. All rights reserved.</p>
  			</Col>	
  			<Col className="DDme">
  				<p>Designed and Developed 
  				<br></br>
  				by Rhiannon Kaultzke</p>
  			</Col>
  		</Row>
  	</Container>			

export default Footer;