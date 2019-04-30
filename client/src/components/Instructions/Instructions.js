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
          </a>{" "}
          (
          <i>
            Si conoces a alguien que pueda realizar el pago usando su cuenta, no
            es necesario que crees una para tí, tan sólo usa el destination tag
            que aparece en tu correo
          </i>
          )
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
              O mediante OXXO (aplican comisiones 2.6% + IVA + comisión en
              tienda)
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
    return (
      <div className={styles.text}>
        <h5>
          Usar el Confettibot es muy sencillo, tan solo abre la app, dando click
          en el botón <strong>app</strong> en la parte superior del sitio.
          <br />
          <br />
          Verás un cuadro como el siguiente mientras esperas que llegue la
          siguiente pregunta.
          <img
            className={styles.image}
            src={require("./cftbt/img1.jpg")}
            alt="Cuadro de informacion"
          />
          Al haber una pregunta en progreso, verás como aparece en el cuadro
          blanco:
          <img
            className={styles.image}
            src={require("./cftbt/img2.jpg")}
            alt="Cuadro con pregunta"
          />
          Y unos segundos después, aparecerá la respuesta más probable:
          <img
            className={styles.image}
            src={require("./cftbt/img3.jpg")}
            alt="Cuadro con respuesta."
          />
          <strong>
            En caso de que se pierda la conexión, aparecerá un mensaje
            indicándolo. Es necesario que recargues la pagina (presionando F5)
          </strong>
          <br />
          <br />
          Por el momento, necesitas usar dos dispositivos para jugar mientras
          usas el Confettibot. Es decir, necesitas tu celular o tableta y otro
          celular/tableta/computadora
          <br />
          adicional. Si tu dispositivo tiene la caracterísitica de dividir la
          pantalla, tambien puedes hacerlo de esa manera.
          <br />
          <br />
          Las apps de iOS y Android pronto estarán disponibles.
        </h5>
        <br />
        <ul className={styles.tips}>
          Tips:
          <li>
            Usa tu sentido común. El bot es una computadora y no siempre tiene
            la respuesta correcta
          </li>
          <li>Si sabes la respuesta, o esperes al bot, ¡respóndela!</li>
          <li>
            Usualmente, 7 de cada 10 respuestas son correctas. A veces un poco
            más, a veces un poco menos
          </li>
          <li>¡¡Compártenos con tus amigos!!</li>
        </ul>
      </div>
    );
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
