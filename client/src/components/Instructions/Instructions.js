import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./instructions.module.scss";
import { Tabs, Tab, Button, Media, Accordion, Card } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import xrpAddressQR from "../../assets/png/QR_xrp_address.png";
import xrpSymbol from "../../assets/png/xrpSymbol-grey.png";

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
          Para activar tu cuenta y tener acceso al Confettibot, realiza tu pago
          seleccionando uno de los planes en la página de activación.
          <br />
          <br />
          Puedes utilizar varias criptomonedas o usar tu cuenta de PayPal
          siguiendo las instrucciones que aparecerán al seleccionar uno de los
          planes.
          <br />
        </p>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                Para pagar usando criptomonedas
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <div className={styles.text}>
                  <p>
                    Crea una cuenta en{" "}
                    <a
                      href="https://bitso.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Bitso.com
                    </a>
                    <br />
                    Bitso es una casa de bolsa mexicana en la que puedes
                    intercambiar pesos mexicanos por varias{" "}
                    <a
                      href="https://www.google.com/search?q=qu%C3%A9+son+las+criptomonedas"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      criptomonedas
                    </a>
                    , transferirlas a otras personas y realizar depósitos en
                    pesos, gratuitos y seguros, a tus amigos por medio de Bitso
                    Transfer.
                    <br />
                    <br />
                    Una vez que tengas tu cuenta, fondéala con la cantidad
                    necesaria para realizar tu pago.
                    <br />
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
                        O mediante OXXO (aplican comisiones 2.6% + IVA +
                        comisión en tienda)
                      </a>
                    </li>
                  </ul>
                  <div>
                    Convierte esos fondos a{" "}
                    <a
                      href="https://help.bitso.com/es-LA/support/solutions/articles/11000038295-soluci%C3%B3n-c%C3%B3mo-comprar-ripple-xrp-"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      XRP
                    </a>
                    ,{" "}
                    <a
                      href="https://help.bitso.com/es-LA/support/solutions/articles/1000210147-soluci%C3%B3n-c%C3%B3mo-comprar-bitcoins-btc-"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      BTC
                    </a>{" "}
                    o{" "}
                    <a
                      href="https://help.bitso.com/es-LA/support/solutions/articles/11000038298-soluci%C3%B3n-como-comprar-ether-eth-"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ETH
                    </a>
                    , y envíalo a la dirección indicada en la página de pago (
                    <i>
                      si usas{" "}
                      <img
                        src={xrpSymbol}
                        className={styles.xrpSymbol}
                        alt=""
                        width={14}
                        height={14}
                      />
                      XRP es NECESARIO que uses el DESTINATION TAG que se
                      indica, de otra manera no se verificará tu pago
                    </i>
                    ) :<br />
                  </div>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <div class={styles.text}>
          <br />
          Unos momentos después que la transacción haya sido confirmada,
          recibirás un correo electrónico confirmando que tu cuenta ha sido
          activada y podrás accesar a la aplicación.
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
          en el botón <strong>app</strong> en el menu del sitio.
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
            indicándolo. Es necesario que recargues la pagina (presionando F5).
          </strong>
          <br />
          <br />
          Por el momento, necesitas usar dos dispositivos para jugar mientras
          usas el Confettibot. Es decir, necesitas tu celular o tableta y otro
          celular/tableta/computadora adicional. Si tu dispositivo tiene la
          caracterísitica de dividir la pantalla, tambien puedes hacerlo de esa
          manera.
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
          <li>Si sabes la respuesta, no esperes al bot, ¡respóndela!</li>
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
    const activationtab = (
      <Tab eventKey="activation" title="Para activar tu cuenta">
        {this.activationInstructions()}
      </Tab>
    );
    const confettibottab = (
      <Tab eventKey="usage" title="Para usar el Confettibot">
        {this.usageInstructions()}
      </Tab>
    );
    return (
      <div className={styles.instructions}>
        <h2>Instrucciones</h2>
        <Tabs onSelect={key => this.setState({ key })} variant="tabs">
          {this.props.authenticated
            ? this.props.user.active
              ? confettibottab
              : [activationtab, confettibottab]
            : [activationtab, confettibottab]}
        </Tabs>
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

export default connect(mapStateToProps)(Instructions);
