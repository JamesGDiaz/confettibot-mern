import React, { Component } from 'react'
import styles from './navigation.module.scss'
import { connect } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class Navigation extends Component {
  render() {
    return (
      <div className={styles.navbarContainer}>
        <Navbar bg="light" expand="lg" className={styles.navbar}>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <LinkContainer to="/">
            <Navbar.Brand className={styles.navbarBrand}>
              CONFETTIBOT
                </Navbar.Brand>
          </LinkContainer>

          {this.props.authenticated ?
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to='/profile'><Nav.Link >Perfil</Nav.Link></LinkContainer>
                <LinkContainer to='/info'><Nav.Link >Información</Nav.Link></LinkContainer>
                <LinkContainer to='/instrucciones'><Nav.Link >Instrucciones</Nav.Link></LinkContainer>
                <LinkContainer to='/app'><Button variant="outline-primary">App</Button></LinkContainer>
              </Nav>
              <Nav>
                <LinkContainer to='/logout'><Nav.Link >Cerrar Sesión</Nav.Link></LinkContainer>
              </Nav>
            </Navbar.Collapse>
            :
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to='/info'><Nav.Link >Información</Nav.Link></LinkContainer>
              </Nav>
              <Nav >
                <LinkContainer to='/login'><Nav.Link>Iniciar Sesión</Nav.Link></LinkContainer>
                <LinkContainer to='/registration'>
                  <Button variant="outline-secondary">Crear Cuenta</Button>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          }
        </Navbar>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated
  }
}

export default connect(mapStateToProps)(Navigation)
