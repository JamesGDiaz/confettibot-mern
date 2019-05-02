import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import styles from "./app.module.scss";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Registration from "./components/Registration/Registration";
import ActivationHash from "./components/ActivationHash/ActivationHash";
import Recovery from "./components/Recovery/Recovery";
import RecoveryHash from "./components/RecoveryHash/RecoveryHash";
import Error from "./components/Error/Error";
import Navigation from "./components/Navigation/Navigation";
import Profile from "./components/Profile/Profile";
import ConfettibotApp from "./components/ConfettibotApp/ConfettibotApp";
import Instructions from "./components/Instructions/Instructions";
import { connect } from "react-redux";
import {
  setUrl,
  setNotifications,
  setAuth,
  setUser
} from "./actions/connectionActions";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import ConfettiAnimation from "./components/ConfettiAnimation/ConfettiAnimation";
import { Spinner } from "react-bootstrap";

axios.defaults.withCredentials = true;

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  if (!authenticated) {
    return <Route {...rest} render={props => <Redirect to="/login" />} />;
  } else {
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.notification = this.notification.bind(this);
    this.notificationDOMRef = React.createRef();
    if (process.env.NODE_ENV === "production") {
      this.url = `https://confettibot.com`;
    } else {
      this.url = `http://${process.env.REACT_APP_HOST}:${
        process.env.REACT_APP_PORT
      }`;
    }
    this.props.setNotifications(this.notification);
    this.props.setUrl(this.url);
    this.state = { loading: true };
  }
  componentDidMount() {
    this.setState({ loading: true });
    this.authenticate((isAuth, user) => {
      if (isAuth) {
        this.props.setAuth(isAuth);
        this.props.setUser(user);
      }
      this.setState({ loading: false });
    });
  }

  authenticate = async callback => {
    const response = await axios.post(`${this.url}/api/user/checklogin`);
    if (response.data.success) {
      callback(true, response.data.user);
    }
    callback(false, null);
  };

  notification(options) {
    const { type, title, message } = options;
    this.notificationDOMRef.current.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "bounceInRight"],
      animationOut: ["animated", "bounceOutRight"],
      dismiss: { duration: 5000 },
      dismissable: { click: true }
    });
  }

  render() {
    return this.state.loading ? (
      <div>
        <Spinner animation="border" variant="dark" role="status" /> Cargando...
      </div>
    ) : (
      <BrowserRouter>
        <div className={styles.app}>
          <ReactNotification ref={this.notificationDOMRef} />
          {/*<ConfettiAnimation />*/}
          <Navigation />
          <div className={styles.body}>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/logout" component={Logout} exact />
              <Route path="/registration" component={Registration} exact />
              <Route
                path="/activation/:hash"
                component={ActivationHash}
                exact
              />
              <Route path="/recovery" component={Recovery} exact />
              <Route path="/recovery/:hash" component={RecoveryHash} />
              <Route
                path="/instrucciones"
                component={Instructions}
                authenticated={this.props.authenticated}
                exact
              />
              <PrivateRoute
                path="/profile"
                component={Profile}
                authenticated={this.props.authenticated}
                exact
              />
              <PrivateRoute
                path="/app"
                component={ConfettibotApp}
                authenticated={this.props.authenticated}
                exact
              />
              <Route component={Error} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated,
    url: state.url
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUrl: url => {
      dispatch(setUrl(url));
    },
    setNotifications: notifications => {
      dispatch(setNotifications(notifications));
    },
    setAuth: authenticated => {
      dispatch(setAuth(authenticated));
    },
    setUser: user => {
      dispatch(setUser(user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
