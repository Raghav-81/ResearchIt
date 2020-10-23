import React from "react"
import { NavLink } from 'react-router-dom';
import { Navbar , Form , FormControl , Button, Nav}  from 'react-bootstrap'
import Trending from "./Trending.js"
import Logo from "./logo.png"
function NavBar() {
  
	return(
	 <Navbar bg = "success" variant="dark" sticky = "top">
    <Navbar.Brand href="/">
    <img src={Logo} style={{width:75, marginTop: -7}} />
    </Navbar.Brand>
    <Nav className="mr-auto">
      <li><NavLink to="/" style={{ marginRight: 10 }}>Home  </NavLink></li>
      <li><NavLink to="/trending">Trending</NavLink></li>
    </Nav>
    </Navbar> 
    )
}

export default NavBar