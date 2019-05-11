import React, { Component } from "react";
import styles from "./profile.module.scss";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Jumbotron, Button } from "react-bootstrap";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import moment from "moment";
import "moment/locale/es";

class Profile extends Component {
  constructor(props) {
    super(props);
    moment().format();
    this.state = {
      open: false
    };
  }

  removeUser = async () => {
    const { id, email } = this.props.user;
    const userdata = {
      data: {
        id,
        email
      }
    };
    this.setState({
      loading: true
    });
    const response = await axios.delete(
      `${this.props.url}/api/user/profileremove`,
      userdata
    );
    this.setState({
      loading: false
    });
    if (response.data.success) {
      this.props.notification({
        type: "success",
        title: "Success!",
        message: "Profile deleted!"
      });
      this.props.history.push("/logout");
    } else {
      this.props.notification({
        type: "danger",
        title: "Delete failed!",
        message: "Try again later!"
      });
    }
  };

  removeDialogClick = () => {
    this.setState({
      open: this.state.open ? false : true
    });
  };

  accountIsActive = () => {
    const { active, expirationDate } = this.props.user;
    const fechaFinal = moment(expirationDate);
    fechaFinal.locale("es");
    if (!active) {
      return (
        <p>
          <b>Tu cuenta no está activada</b>
          <LinkContainer to="/activar">
            <Button variant="primary" size="lg" block>
              Actívala aquí
            </Button>
          </LinkContainer>
        </p>
      );
    } else {
      return (
        <p>
          <strong>
            Tu cuenta está activada
            <br />
          </strong>{" "}
          Fecha de expiración: {fechaFinal.format("LL")}
        </p>
      );
    }
  };

  render() {
    return (
      <div className={styles.profile}>
        <Jumbotron>
          <h1>Mi Perfil</h1>
          <p>
            <b>Nombre:</b> {this.props.user.name}
          </p>
          <p>
            <b>Email:</b> {this.props.user.email}
          </p>
          {this.accountIsActive()}
          <Button
            onClick={this.removeDialogClick}
            className={styles.button}
            variant="danger"
          >
            Eliminar mi perfil
          </Button>
          <Dialog
            open={this.state.open}
            onClose={this.removeDialogClick}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Eliminar tu cuenta?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ¿Estás completamente seguro/a?
                <br />
                <br />
                Esta acción es irreversible, tendrás que crear y activar una
                cuenta de nuevo para poder volver.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.removeDialogClick}
                variant="primary"
                autoFocus
              >
                No
              </Button>
              <Button onClick={this.removeUser} variant="danger">
                ELIMINAR
              </Button>
            </DialogActions>
          </Dialog>
        </Jumbotron>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    url: state.url,
    user: state.user,
    notification: state.notification
  };
};

export default connect(mapStateToProps)(Profile);
