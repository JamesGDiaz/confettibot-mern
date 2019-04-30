import React, { Component } from "react";
import {
  Paper,
  Typography, // eslint-disable-next-line
  FormControlLabel, // eslint-disable-next-line
  Checkbox
} from "@material-ui/core";
import { Button, ButtonToolbar } from "react-bootstrap";
import styles from "./login.module.scss";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { setAuth, setUser } from "../../actions/connectionActions";
import { withRouter } from "react-router";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { LinkContainer } from "react-router-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loading: false
    };
  }

  addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Awesomeness",
      message: "Awesome Notifications!",
      type: "warning",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "bounceIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  login = async () => {
    const { email, password } = this.state;
    const userdata = {
      email: email,
      password: password
    };
    this.setState({
      loading: true
    });
    const response = await axios.post(
      `${this.props.url}/api/user/login`,
      userdata
    );
    if (response.data.success) {
      this.props.setAuth(true);
      this.props.setUser(response.data.user);
      this.props.history.push("/");
    } else {
      this.setState({
        loading: false
      });
      this.props.notification({
        type: "danger",
        title: "Email o contraseña incorrectos",
        message: "¡Corrígelos! :("
      });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render = () => {
    const { loading } = this.state;
    return (
      <div className={styles.login}>
        <Paper>
          <Typography className={styles.title} component="h1" variant="h5">
            Inicia sesión:
          </Typography>
          <ValidatorForm
            ref="form"
            onSubmit={this.login}
            // onError={ errors => console.log(errors) }
            className={styles.content}
          >
            <TextValidator
              label="Correo"
              onChange={this.handleChange("email")}
              name="email"
              value={this.state.email}
              validators={["required", "isEmail"]}
              errorMessages={["Ingresa tu email", "La dirección no es válida"]}
              margin="normal"
              fullWidth
            />
            <TextValidator
              label="Contraseña"
              onChange={this.handleChange("password")}
              name="password"
              type="password"
              value={this.state.password}
              validators={[
                "required",
                "minStringLength:5",
                "maxStringLength:100"
              ]}
              errorMessages={[
                "Ingresa tu contraseña",
                "Mínimo 5 caracteres",
                "Mñaximo 100 catacteres"
              ]}
              margin="normal"
              fullWidth
            />
            {/*<FormControlLabel
              control={<Checkbox value="remember" color="secondary" />}
              label="Mantener mi sesión iniciada"
            />*/}
            <ButtonToolbar>
              {loading ? (
                <Button variant="contained" color="primary" disabled block>
                  <CircularProgress color="primary" size={24} />
                </Button>
              ) : (
                <Button type="submit" variant="primary" block>
                  Iniciar sesión
                </Button>
              )}
              <LinkContainer to="/registration">
                <Button type="submit" variant="primary" block>
                  Ir a registrarme
                </Button>
              </LinkContainer>
            </ButtonToolbar>
          </ValidatorForm>
        </Paper>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    url: state.url,
    authenticated: state.authenticated,
    notification: state.notification
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAuth: authenticated => {
      dispatch(setAuth(authenticated));
    },
    setUser: user => {
      dispatch(setUser(user));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
