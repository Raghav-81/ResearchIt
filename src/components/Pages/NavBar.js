import React ,{useContext} from 'react'
import { Link} from 'react-router-dom';
import { Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap'
import UserContext from "../context/UserContext";
import Logo from '../logo.png'
function NavBar(Login) {
  const { userData, setUserData } = useContext(UserContext);
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  return (
  <Navbar bg="success"
          variant="dark"
          sticky="top">
    <Navbar.Brand href="/">
      <img src={ Logo }
           style={ { width: 75, marginTop: -7 } }
           alt = "logo"/>
    </Navbar.Brand>
    {userData.user ?(
      <>

    <Nav className="mr-auto">
      <li>
        <Link to="/" style={ { marginRight: 10 } }>
          Home
        </Link>
      </li>
      <li>
        <Link to="/trending" style={ { marginRight: 10 } }>
          Trending
        </Link>
      </li>
      <li>
        <Link to="/profile" style={ { marginRight: 10 } }>
          Profile
        </Link>
      </li>
    </Nav>
      <Nav  className="justify-content-end">
      <Button variant="primary" onClick = {logout}>Logout</Button>{' '}
    </Nav>
    </>
    ):
    (<>

    <Nav className="mr-auto">
      <li>
        <Link to="/" style={ { marginRight: 10 } }>
          Home
        </Link>
      </li>
      <li>
        <Link to="/about" style={ { marginRight: 10 } }>
          About
        </Link>
      </li>
      <li>
        <Link to="/contact" style={ { marginRight: 10 } }>
          Contact
        </Link>
      </li>
    </Nav>
      <Nav  className="justify-content-end">
      <li>
        <Link to= "/Login" style= {{marginLeft: 0}}>
          <Button variant="primary">Login</Button>{' '}
        </Link>
      </li>
    </Nav>
    <Nav  className="justify-content-end">
      <li>
        <Link to= "/register" style= {{marginLeft: 10}}>
          <Button variant="primary">register</Button>{' '}
        </Link>
      </li>
    </Nav>
    </>
    )
  }
  </Navbar>
  )
}

export default NavBar
