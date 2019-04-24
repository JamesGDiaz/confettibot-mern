import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./home.module.scss";
import { Container, Row, Col, Jumbotron, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class Home extends Component {
  render() {
    return (
      <div className={styles.home}>
        <Container>
          {this.props.authenticated ? (
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
              <Jumbotron style={{ textAlign: "start", textJustify: "auto" }}>
                <strong>Renuncia de responsabilidad:</strong>
                <ul>
                  <li>
                    Confettibot.com (el sitio) fue hecho con fines de
                    entretenimiento y no se hace responsable por el mal uso que
                    se le pueda dar.
                  </li>
                  <li>
                    El sitio tampoco se hace responsable de los daños ni
                    perjuicios que pudieran surgir de su uso, el usuario es el
                    único responsable de sus acciones.
                  </li>
                  <li>
                    Rendimientos pasados no garantizan rendimientos futuros,
                    confettibot.com no garantiza ningún estándar de rendimiento,
                    exactitud ni precisión en sus funciones. Use su sentido
                    común.
                  </li>
                  <li>
                    El sitio no comparte ni vende datos personales (tales como
                    correos electrónicos, nombres, direcciones IP, etc.) a
                    terceros, los datos recibidos son usados únicamente con
                    fines de calidad en el servicio.
                  </li>
                  <li>
                    Los operadores del sitio se reservan el derecho de eliminar
                    la cuenta de algún usuario y dejar de brindar sus servicios
                    a éste a su discreción, y sin responsabilidad alguna, en
                    caso de que así lo consideren necesario para el buen
                    funcionamiento del sitio.
                  </li>
                  <li>
                    Al crear y/o activar su cuenta, el usuario acepta y reconoce
                    los términos expresados en este apartado.
                  </li>
                </ul>
              </Jumbotron>
            </Col>
          </Row>
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
    authenticated: state.authenticated
  };
};

export default connect(mapStateToProps)(Home);
