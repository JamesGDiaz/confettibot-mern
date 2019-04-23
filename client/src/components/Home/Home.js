import React, { Component } from "react";
import styles from "./home.module.scss";

class Home extends Component {
  render() {
    return (
      <div className={styles.home}>
        <h1>TODO:</h1>
        <ul>
          <li>Pagina de instrucciones</li>
          <li>Informacion en email de registro</li>
          <li>Auto activar cuenta al recibir pago en XRP</li>
          <li>
            Solo permitir acceso a los endpoints de websocket si el usuario esta
            autenticado
          </li>
          <li>Implementar cambio de contrasena</li>
        </ul>
      </div>
    );
  }
}

export default Home;
