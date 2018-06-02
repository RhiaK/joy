import React from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';

const Header = () =>
  <div className="header">
  	<Container>
  		<Row>
  			<Col>
  				<h1 className="title">The Joyfilled Teacher</h1>
  			</Col>
  		</Row>
  	</Container>			
  </div>

export default Header;