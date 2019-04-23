import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./instructions.module.scss";
import { Jumbotron, Tabs, Tab, Button, Card } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import xrpAddressQR from "./QR_xrp_address.png";

class Instructions extends Component {
  constructor() {
    super();
    this.xrpAddress = "rHC8JpKjGfFjttM2a1r2kpPgL3QojWjMJ6";
  }
  state = {
    key: "activation",
    copied: "false"
  };

  activationInstructions = () => {
    return (
      <div className={styles.text}>
        <br />
        <h2>Para activar tu cuenta:</h2>
        <p>
          Crea una cuenta en{" "}
          <a href="https://bitso.com" target="_blank" rel="noopener noreferrer">
            Bitso.com
          </a>
          <br />
          Bitso es una casa de bolsa mexicana en la que puedes intercambiar
          pesos mexicanos por varias{" "}
          <a
            href="https://www.google.com/search?q=qu%C3%A9+son+las+criptomonedas"
            target="_blank"
            rel="noopener noreferrer"
          >
            criptomonedas
          </a>
          , transferirlas a otras personas y realizar depósitos en pesos,
          gratuitos y seguros, a tus amigos por medio de Bitso Transfer.
          <br />
          <br />
          Una vez que tengas tu cuenta, fondéala con $500 pesos. <br />
          <ul>
            <li>
              <a
                href="https://help.bitso.com/es-LA/support/solutions/articles/1000167656-tutorial-fondear-cuenta-por-medio-de-spei"
                target="_blank"
                rel="noopener noreferrer"
              >
                Puedes fondear mediante SPEI
              </a>
            </li>
            <li>
              <a
                href="https://help.bitso.com/es-LA/support/solutions/articles/1000166720-tutorial-cómo-fondear-en-efectivo-por-medio-de-oxxo-"
                target="_blank"
                rel="noopener noreferrer"
              >
                O mediante OXXO (aplican comisiones)
              </a>
            </li>
          </ul>
          Convierte esos fondos a XRP siguiendo las instrucciones en{" "}
          <a
            href="https://help.bitso.com/es-LA/support/solutions/articles/11000038295-soluci%C3%B3n-c%C3%B3mo-comprar-ripple-xrp-"
            target="_blank"
            rel="noopener noreferrer"
          >
            este enlace
          </a>
          , y envíalo a la siguiente dirección USANDO TU DESTINATION TAG{" "}
          <a
            href="https://help.bitso.com/es-LA/support/solutions/articles/11000038288-tutorial-retira-ripple-xrp-de-bitso"
            target="_blank"
            rel="noopener noreferrer"
          >
            (instrucciones)
          </a>
          :<br />
          <strong>
            <i>
              Es muy importante que ingreses el destination tag que recibiste en
              el correo de registro. De otra manera no podremos verificar tu
              pago.
            </i>
          </strong>
          <br />
          <br />
          <Card bg="light" style={{ width: "18rem", alignSelf: "center" }}>
            <Card.Img variant="top" src={xrpAddressQR} />
            <Card.Body>
              <Card.Title>Dirección</Card.Title>
              <Card.Text style={{ fontSize: "calc(10px + 0.5vmin)" }}>
                <i>{this.xrpAddress}</i>
                <br />
                <CopyToClipboard
                  text={this.xrpAddress}
                  onCopy={() => this.setState({ copied: true })}
                >
                  <Button variant="outline-secondary" size="sm">
                    Copiar
                  </Button>
                </CopyToClipboard>
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
          <br />
          Unos momentos después que hayas realizado la transacción, recibirás un
          correo electrónico confirmando que tu cuenta ha sido activada y podrás
          accesar a la aplicación.
          <br />
          Para cualquier aclaración, envíanos un correo a{" "}
          <a
            href="mailto://confettibotmx@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            confettibotmx@gmail.com
          </a>
          <br />
          <br />
          <strong style={{ fontSize: "calc(10px + 3vmin)" }}>
            ¡Mucha confettisuerte!
          </strong>
        </p>
      </div>
    );
  };

  usageInstructions = () => {
    return <p>Para usar el cftbt</p>;
  };
  render() {
    return (
      <div className={styles.instructions}>
        <Jumbotron className="container">
          <h1>Instrucciones</h1>
          <Tabs
            defaultActiveKey="activation"
            onSelect={key => this.setState({ key })}
          >
            <Tab eventKey="activation" title="Activar Cuenta">
              {this.activationInstructions()}
            </Tab>
            {this.props.authenticated ? (
              <Tab eventKey="usage" title="Usar el Confettibot">
                {this.usageInstructions()}
              </Tab>
            ) : (
              <Tab eventKey="usage" title="Usar el Confettibot" disabled />
            )}
          </Tabs>
        </Jumbotron>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated
  };
};

export default connect(mapStateToProps)(Instructions);
