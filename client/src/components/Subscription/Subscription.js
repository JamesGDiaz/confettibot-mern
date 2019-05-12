import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./subscription.module.scss";
import { Button, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCoins } from "@fortawesome/free-solid-svg-icons";
import {
  faBitcoin,
  faEthereum,
  faPaypal
} from "@fortawesome/free-brands-svg-icons";
import xrpSymbol from "../../assets/png/xrpSymbol-grey.png";
import cpBuyNowYellow from "../../assets/png/cp-buynow-wide-yellow.png";

const icons = { faCheckCircle, faCoins, faBitcoin, faEthereum, faPaypal };

class Subscription extends Component {
  Aceptamos = () => {
    return (
      <p class="text-muted text-xm mt-2 mb-0 _500 text-antialiased">
        <FontAwesomeIcon icon={icons.faCoins} color={"gray"} size="xs" />{" "}
        Aceptamos:
        <br />
        <FontAwesomeIcon
          icon={icons.faPaypal}
          color={"gray"}
          size="s"
        /> PayPal{" "}
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

  payButton = (item_number, value, email) => {
    return (
      <form action="https://www.coinpayments.net/index.php" method="post">
        <input type="hidden" name="cmd" value="_pay" />
        <input type="hidden" name="reset" value="1" />
        <input
          type="hidden"
          name="merchant"
          value="b4c4120f798c876934a6d24cb8d4c0b8"
        />
        <input
          type="hidden"
          name="item_name"
          value="Suscripción a Confettibot.com"
        />
        <input type="hidden" name="item_number" value={item_number} />
        <input type="hidden" name="currency" value="MXN" />
        <input type="hidden" name="amountf" value={value} />
        <input type="hidden" name="quantity" value="1" />
        <input type="hidden" name="allow_quantity" value="0" />
        <input type="hidden" name="want_shipping" value="0" />
        <input
          type="hidden"
          name="success_url"
          value="https://confettibot.com/profile"
        />
        <input
          type="hidden"
          name="cancel_url"
          value="https://confettibot.com/"
        />
        <input
          type="hidden"
          name="ipn_url"
          value="https://confettibot.com/api/user/activation"
        />
        <input type="hidden" name="email" value={email} />
        <input
          type="image"
          src={cpBuyNowYellow}
          alt="Compra Ahora Con CoinPayments.net"
        />
      </form>
    );
  };

  render() {
    return (
      <div className={styles.container}>
        <h1>Planes</h1>
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
                    <Badge variant="info">Mensual</Badge>
                  </p>
                  <ul class="list-unstyled m-0 _500 text-antialiased">
                    <li class="pb-1">
                      <FontAwesomeIcon
                        icon={icons.faCheckCircle}
                        color={"green"}
                        size="s"
                      />{" "}
                      <span>Disponible todos los juegos</span>
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
                <div class="px-5">
                  {this.payButton(
                    "cftbt_monthly",
                    "179.000",
                    this.props.user.email
                  )}
                  {this.Aceptamos()}
                </div>
              </div>
            </div>
          </div>
          <div class="row no-gutters">
            <div class="col-md-5 d-flex">
              <div class="align-self-center">
                <div class="p-5">
                  <p class="text-center _500 mb-4">
                    <Badge variant="info">Ilimitado</Badge>
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
                <small>Solamente</small>
                <div class="h3">
                  <sup>$</sup>
                  <span style={{ "font-size": "1.5em" }}>499</span>
                  <small>.00 MXN*</small>
                </div>
                <div class="px-5">
                  {this.payButton(
                    "cftbt_unlimited",
                    "499.00",
                    this.props.user.email
                  )}
                  {this.Aceptamos()}
                </div>
              </div>
            </div>
            <br />
            <p class="text-muted text-sm mt-10 mb-0 _500 text-antialiased float-left">
              <small>
                * La cantidad total puede variar debido al tipo de cambio del
                momento en que se realice el pago.
              </small>
            </p>
          </div>
        </div>
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

export default connect(mapStateToProps)(Subscription);
