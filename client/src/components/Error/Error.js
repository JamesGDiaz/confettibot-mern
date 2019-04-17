import React, { Component } from 'react'
import styles from './error.module.scss'
import { Jumbotron, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
class Error extends Component {
  render() {
    return (
      <div className={styles.error}>
        <Jumbotron>
          <h1>404</h1>
          <h2>Ups! No se que estabas buscando...</h2>
          <LinkContainer to="/">
            <Button variant="dark">
              Ir al inicio
            </Button>
          </LinkContainer>
        </Jumbotron>
      </div>
    )
  }
}

export default Error