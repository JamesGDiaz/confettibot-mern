import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./home.module.scss";
import { Container, Row, Col, Jumbotron, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";

class Home extends Component {
  checklogin = async () => {
    console.log("Checking login");
    const res = await axios.post(`http://localhost:3001/api/user/check`);
    console.log("authenticated? " + res);
  };

  render() {
    return (
      <div className={styles.home}>
        <Container>
          {this.props.authenticated ? (
            this.props.user.active ? (
              <Row>
                <Col>
                  <Jumbotron>
                    <LinkContainer to="/app">
                      <Button variant="primary" size="lg" block>
                        Abrir el confettibot
                      </Button>
                    </LinkContainer>
                  </Jumbotron>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col>
                  <Jumbotron>
                    <LinkContainer to="/activar">
                      <Button variant="primary" size="lg" block>
                        Activa tu cuenta aquí
                      </Button>
                    </LinkContainer>
                  </Jumbotron>
                </Col>
              </Row>
            )
          ) : (
            <Row>
              <Col>
                <Jumbotron>
                  <h1>Bienvenido/a!</h1>
                  <br />
                  <h2>
                    <LinkContainer to="/login">
                      <Button variant="outline-primary">Inicia sesión</Button>
                    </LinkContainer>{" "}
                    para continuar.
                    <br />
                    <br />O{" "}
                    <LinkContainer to="/registration">
                      <Button variant="outline-primary">
                        regístrate aquí.
                      </Button>
                    </LinkContainer>{" "}
                    <br />
                    <br />
                    Recuerda compartirnos con tus amigos.
                  </h2>
                </Jumbotron>
              </Col>
              <Col>
                <Jumbotron>
                  <h2>
                    <strong>Confettibot.com</strong> es un servicio en el que
                    por sólo $500 pesos, estarás mucho más cerca de ganar mucho
                    pero mucho dinero! <br />
                    <br />
                    <br />
                    Tan sólo tienes que{" "}
                    <LinkContainer to="/registration">
                      <Button variant="outline-primary">crear</Button>
                    </LinkContainer>{" "}
                    y{" "}
                    <LinkContainer to="/instrucciones">
                      <Button variant="outline-primary">activar</Button>
                    </LinkContainer>{" "}
                    tu cuenta para comenzar.
                  </h2>
                </Jumbotron>
              </Col>
            </Row>
          )}
          <Row>
            <Col>
              <Jumbotron>
                <h3>
                  <a
                    href="mailto:confettibotmx@gmail.com"
                    rel="noopener noreferrer"
                  >
                    Envíanos tus preguntas y comentarios
                  </a>
                </h3>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
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

export default connect(mapStateToProps)(Home);
