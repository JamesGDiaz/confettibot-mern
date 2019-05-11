import React, { Component } from "react";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import styles from "./subscriptioninfo.module.scss";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCoins } from "@fortawesome/free-solid-svg-icons";
import { faBitcoin, faEthereum } from "@fortawesome/free-brands-svg-icons";
import xrpSymbol from "../../assets/png/xrpSymbol.png";

const icons = { faCheckCircle, faCoins, faBitcoin, faEthereum };

class SubscriptionInfo extends Component {
  state = {
    key: "activation",
    copied: "false"
  };

  Aceptamos = () => {
    return (
      <p class="text-muted text-xm mt-2 mb-0 _500 text-antialiased">
        <FontAwesomeIcon icon={icons.faCoins} color={"gray"} size="xs" />{" "}
        Aceptamos:
        <br />
        <img
          src={xrpSymbol}
          className={styles.xrpSymbol}
          alt=""
          width={16}
          height={16}
        />{" "}
        XRP <FontAwesomeIcon icon={icons.faBitcoin} color={"gray"} size="s" />{" "}
        BTC <FontAwesomeIcon icon={icons.faEthereum} color={"gray"} size="s" />{" "}
        ETH y más...
      </p>
    );
  };

  render() {
    return (
      <div className={styles.container}>
        <h2>Planes</h2>
        <div>
          <div
            class="row no-gutters"
            style={{
              "border-bottom": "1px solid #c0c0c0"
            }}
          >
            <div class="col-md-5 d-flex">
              <div class="align-self-center">
                <div class="p-5">
                  <p class="text-center _500 mb-4">
                    <strong>Mensual</strong>
                  </p>
                  <ul class="list-unstyled m-0 _500 text-antialiased">
                    <li class="pb-1">
                      <FontAwesomeIcon
                        icon={icons.faCheckCircle}
                        color={"green"}
                        size="s"
                      />{" "}
                      Disponible todos los juegos de Confetti México
                    </li>
                    <li class="pb-1">
                      <FontAwesomeIcon
                        icon={icons.faCheckCircle}
                        color={"green"}
                        size="s"
                      />{" "}
                      <span>Más del 75% de respuestas correctas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-7 box-radius-4 light lt text-center">
              <div class="py-5">
                <small>Solamente</small>
                <div class="h3">
                  <sup>$</sup>
                  <span style={{ "font-size": "1.5em" }}>179</span>
                  <small>.00 MXN*</small>
                </div>
                <p class="text-sm font-brand text-uppercase">mensuales</p>
                <div class="px-5">{this.Aceptamos()}</div>
              </div>
            </div>
          </div>
          <div class="row no-gutters">
            <div class="col-md-5 d-flex">
              <div class="align-self-center">
                <div class="p-5">
                  <p class="text-center _500 mb-4">
                    <strong>Ilimitado</strong>
                  </p>
                  <ul class="list-unstyled m-0 _500 text-antialiased">
                    <li class="pb-1">
                      <FontAwesomeIcon
                        icon={icons.faCheckCircle}
                        color={"green"}
                        size="s"
                      />{" "}
                      <span>
                        Disponible todos los juegos de Confetti México
                      </span>
                    </li>
                    <li class="pb-1">
                      <FontAwesomeIcon
                        icon={icons.faCheckCircle}
                        color={"green"}
                        size="s"
                      />{" "}
                      <span>Más del 75% de respuestas correctas</span>
                    </li>
                    <li class="pb-1">
                      <FontAwesomeIcon
                        icon={icons.faCheckCircle}
                        color={"green"}
                        size="s"
                      />{" "}
                      <span>Ilimitado de por vida!</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-7 box-radius-4 light lt text-center">
              <div class="py-5">
                <small>Por</small>
                <div class="h3">
                  <sup>$</sup>
                  <span style={{ "font-size": "1.5em" }}>499</span>
                  <small>.00 MXN*</small>
                </div>
                <div class="px-5">{this.Aceptamos()}</div>
              </div>
            </div>
          </div>
          <p class="text-muted text-sm mt-2 mb-0 _500 text-antialiased">
            ¿Qué estás esperando? Regístrate!
          </p>
          <LinkContainer to="/registration">
            <Button variant="success" size="lg" block>
              Regístrate aquí
            </Button>
          </LinkContainer>
          <br />
          <p class="text-muted text-sm mt-10 mb-0 _500 text-antialiased float-left">
            <small>
              * La cantidad total puede variar debido al tipo de cambio del
              momento en que se realice el pago.
            </small>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated
  };
};

export default connect(mapStateToProps)(SubscriptionInfo);
