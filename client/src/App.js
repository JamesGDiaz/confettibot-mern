import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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
import Info from "./components/Info/Info";
import Instructions from "./components/Instructions/Instructions";
import { connect } from "react-redux";
import { setUrl, setNotifications } from "./actions/connectionActions";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import ProfileModify from "./components/ProfileModify/ProfileModify";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.notification = this.notification.bind(this);
    this.notificationDOMRef = React.createRef();
    this.url = `https://${process.env.REACT_APP_HOST}:${
      process.env.REACT_APP_PORT
    }`;
    this.props.setNotifications(this.notification);
    this.props.setUrl(this.url);
  }

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
    return (
      <BrowserRouter>
        <div className={styles.app}>
          <ReactNotification ref={this.notificationDOMRef} />
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
              <Route path="/info" component={Info} exact />
              <PrivateRoute
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
                path="/profile/modify"
                component={ProfileModify}
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
    authenticated: state.authenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUrl: url => {
      dispatch(setUrl(url));
    },
    setNotifications: notifications => {
      dispatch(setNotifications(notifications));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
