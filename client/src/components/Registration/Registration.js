import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import styles from "./registration.module.scss";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue, green } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { connect } from "react-redux";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Button, Jumbotron } from "react-bootstrap";
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green
  },
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passwordAgain: "",
      loading: false
    };
  }

  register = async () => {
    const { email, password } = this.state;
    const userdata = {
      email,
      password
    };
    this.setState({
      loading: true
    });
    const response = await axios.put(
      `${this.props.url}/api/user/registration`,
      userdata
    );
    this.setState({
      loading: false
    });
    if (response.data.success) {
      this.props.notification({
        type: "success",
        title: "Registro completo!",
        message: "Revisa tu correo! (revisa tu carpeta de spam)"
      });
      this.props.history.push("/");
    } else {
      this.props.notification({
        type: "danger",
        title: "El registro falló!",
        message: "Este correo ya está registrado!"
      });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  render = () => {
    const { loading } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={styles.registration}>
          <Jumbotron>
            <Typography className={styles.title} component="h1" variant="h5">
              Crea tu cuenta:
            </Typography>
            <ValidatorForm
              ref="form"
              onSubmit={this.register}
              onError={errors => console.log(errors)}
              className={styles.content}
            >
              <TextValidator
                label="Email"
                onChange={this.handleChange("email")}
                name="email"
                value={this.state.email}
                validators={[
                  "required",
                  "isEmail",
                  "minStringLength:5",
                  "maxStringLength:100"
                ]}
                errorMessages={[
                  "Este campo es necesario",
                  "Ingresa una dirección de correo válida",
                  "Mínimo 5 caracteres",
                  "Máximo 30 caracteres"
                ]}
                margin="normal"
                fullWidth
              />
              <p className={styles.muted}>
                Nunca revelaremos tus datos a terceros
              </p>
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
                  "Este campo es necesario",
                  "Mínimo 5 caracteres",
                  "Máximo 100 caracteres"
                ]}
                margin="normal"
                fullWidth
              />
              <TextValidator
                label="Verifica tu contraseña"
                onChange={this.handleChange("passwordAgain")}
                name="passwordAgain"
                type="password"
                value={this.state.passwordAgain}
                validators={[
                  "required",
                  "isPasswordMatch",
                  "minStringLength:5",
                  "maxStringLength:100"
                ]}
                errorMessages={[
                  "Este campo es necesario",
                  "Las contraseñas no coincided",
                  "Mínimo 5 caracteres",
                  "Máximo 100 caracteres"
                ]}
                margin="normal"
                fullWidth
              />
              {loading ? (
                <Button
                  className={styles.button}
                  variant="primary"
                  block
                  disabled
                >
                  <CircularProgress color="primary" size={24} />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className={styles.button}
                  variant="primary"
                  block
                >
                  Crear cuenta
                </Button>
              )}
            </ValidatorForm>
          </Jumbotron>
        </div>
      </MuiThemeProvider>
    );
  };
}

const mapStateToProps = state => {
  return {
    url: state.url,
    notification: state.notification
  };
};

export default connect(mapStateToProps)(App);
