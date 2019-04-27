import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./instructions.module.scss";
import { Jumbotron, Tabs, Tab, Button, Media } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import xrpAddressQR from "./QR_xrp_address.png";
import xrpSymbol from "./xrpSymbol.png";

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
          Realiza tu pago mediante una transferencia a la dirección{" "}
          <img
            src={xrpSymbol}
            className={styles.xrpSymbol}
            alt=""
            width={18}
            height={18}
          />{" "}
          Ripple/XRP <i>{this.xrpAddress}</i> usando el destination tag que
          recibiste en tu correo.
          <br />
          <br /> Crea una cuenta en{" "}
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
        </p>
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
        <div>
          Convierte esos fondos a{" "}
          <img
            src={xrpSymbol}
            className={styles.xrpSymbol}
            alt=""
            width={18}
            height={18}
          />{" "}
          XRP siguiendo las instrucciones en{" "}
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
          <br />
          <strong>
            <i>
              Es muy importante que ingreses el número que recibiste en el
              correo de registro (destination tag). De otra manera no podremos
              verificar tu pago.
            </i>
          </strong>
          <br />
          <br />
          <Media bg="light" style={{ width: "18rem", alignSelf: "center" }}>
            <img
              width={100}
              height={100}
              className="mr-2"
              src={xrpAddressQR}
              alt="Código QR"
            />
            <Media.Body>
              <strong>Dirección Ripple/XRP</strong>
              <div style={{ fontSize: "calc(10px + 0.5vmin)" }}>
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
              </div>
            </Media.Body>
          </Media>
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
        </div>
      </div>
    );
  };

  usageInstructions = () => {
    return <p>En construcción</p>;
  };

  render() {
    return (
      <div className={styles.instructions}>
        <Jumbotron className="container">
          <h2>Instrucciones</h2>
          <Tabs
            defaultActiveKey="activation"
            onSelect={key => this.setState({ key })}
            variant="pills"
          >
            <Tab eventKey="activation" title="Para activar tu cuenta">
              {this.activationInstructions()}
            </Tab>

            <Tab eventKey="usage" title="Para usar el Confettibot">
              {this.props.authenticated ? (
                this.usageInstructions()
              ) : (
                <div>
                  <br />
                  <br />
                  <h3>Inicia sesión para ver las instrucciones.</h3>
                </div>
              )}
            </Tab>
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
