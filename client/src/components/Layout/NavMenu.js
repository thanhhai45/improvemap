import React, {useContext} from "react"
import Nav from "react-bootstrap/Nav"
import Navbar from 'react-bootstrap/Navbar'
import Logo from '../../assets/logo.svg'
import LogoLogout from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import {AuthContext} from "../../contexts/AuthContext"

function NavMenu(){
  const { authState: { user: { username } }, logoutUser } = useContext(AuthContext)

  const logout = () => logoutUser()

  return(
    <Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
      <Navbar.Brand className="font-weight-bolder text-white">
        <img src={Logo} alt="Logo Header" width="32" heigth="32" className="mr-2"/>
        MERN APP
      </Navbar.Brand> 
      <Navbar.Toggle aria-controls='basic-navbar-nav'/>
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className="mr-auto">
          <Nav.Link className="font-weight-bolder text-white" to="/dashboard" as={Link}>
            Dashboard
          </Nav.Link>
          
          <Nav.Link className="font-weight-bolder text-white" to="/about" as={Link}>
            About
          </Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link className="font-weight-bolder text-white" disabled>
            Welcome {username}
          </Nav.Link>
        </Nav>
        <Button variant="secondary" className="font-weight-bolder text-white" onClick={logout}>
          <img src={LogoLogout} alt="LogoutIcon" width="32" height="32" className="mr-2"/>
          LogOut
        </Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavMenu
