import React, { Component } from "react";
import styles from "./navigation.module.scss";
import { connect } from "react-redux";
import { Navbar, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navExpanded: false,
      email: null
    };
  }

  componentWillMount() {
    this.setState({ navExpanded: false });
  }

  setNavExpanded = expanded => {
    this.setState({ navExpanded: expanded });
  };

  closeNav = () => {
    this.setState({ navExpanded: false });
  };

  render() {
    return (
      <div className={styles.navbarContainer}>
        <Navbar
          bg="light"
          expand="lg"
          className={styles.navbar}
          collapseOnSelect={true}
        >
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <LinkContainer to="/">
            <Navbar.Brand className={styles.navbarBrand}>
              CONFETTIBOT
            </Navbar.Brand>
          </LinkContainer>

          {this.props.authenticated ? (
            <Navbar.Collapse
              id="responsive-navbar-nav"
              onSelect={this.closeNav}
            >
              <Nav className="mr-auto">
                <LinkContainer to="/profile">
                  <Nav.Link>Perfil</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/instrucciones">
                  <Nav.Link>Instrucciones</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/app">
                  <Button variant="outline-primary">App</Button>
                </LinkContainer>
                <LinkContainer to="/appsocket">
                  <Button variant="outline-primary">AppSocket</Button>
                </LinkContainer>
              </Nav>
              <Nav>
                <LinkContainer to="/logout">
                  <Nav.Link>Cerrar Sesión</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          ) : (
            <Navbar.Collapse
              id="responsive-navbar-nav"
              onSelect={this.closeNav}
            >
              <Nav className="mr-auto">
                <LinkContainer to="/instrucciones">
                  <Nav.Link>Instrucciones</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav>
                <LinkContainer to="/login">
                  <Nav.Link>Iniciar Sesión</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/registration">
                  <Button variant="outline-secondary">Crear Cuenta</Button>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          )}
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    authenticated: state.authenticated,
    user: state.user
  };
};

export default connect(mapStateToProps)(Navigation);
