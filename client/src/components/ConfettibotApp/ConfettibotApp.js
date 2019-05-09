import React from "react";
import { connect } from "react-redux";
import { Fade, Spinner, Button } from "react-bootstrap";
import styles from "./confettibotapp.module.scss";

class ConfettibotApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStatus: null,
      gameIsOn: false,
      searching: false,
      question: "",
      question_visibility: false,
      answer: "",
      answer_visibility: false,
      info: "",
      info_visibility: true,
      connected: true
    };
  }

  componentDidMount() {
    this.setUpWebsocket();
    let gameStatus = this.getGameStatus();
    let gameIsOn = false;
    if (gameStatus.includes("Esperando")) {
      gameIsOn = true;
    }
    this.setState({ gameStatus, gameIsOn });
  }

  getGameStatus = () => {
    const d = new Date();
    const date = {
      day: d.getDay(),
      hours: d.getHours(),
      minutes: d.getMinutes()
    };
    if (date.day <= 5) {
      if (date.day === 5 && date.hours >= 22 && date.minutes >= 29) {
        return "El siguiente juego es el lunes a las 6:30pm.";
      } else if (date.hours === 18 && date.minutes >= 30) {
        return "Esperando siguiente pregunta...";
      } else if (date.hours === 22 && date.minutes < 29) {
        return "Esperando siguiente pregunta...";
      } else if (date.hours <= 18) {
        return "El siguiente juego es hoy a las 6:30pm.";
      } else if (date.hours > 18 && date.hours < 22) {
        return "El siguiente juego es hoy a las 10:00pm.";
      } else if (date.hours >= 22 && date.minutes >= 29) {
        return "El siguiente juego es mañana a las 6:30pm.";
      }
    } else return "El siguiente juego es el lunes a las 6:30pm.";
  };

  componentWillUnmount() {
    if (!this.ws) return;

    try {
      this.ws.close();
    } catch (err) {
      console.log("Error in closing ws: ", err);
    }
  }

  setUpWebsocket = () => {
    this.ws = new WebSocket(this.props.url.replace(/^http/, "ws") + "/api/app");
    this.ws.addEventListener("open", event => {
      this.setState({ connected: true });
    });
    this.ws.addEventListener("message", message => {
      this.handleData(message.data);
    });
    this.ws.addEventListener("close", event => {
      this.setState({ connected: false });
      this.handleData(
        `{"type": "INFO", "message": "Conexión perdida. Presiona el botón!"}`
      );
    });
  };

  handleData = data => {
    console.log(data);
    let jsonmessage = JSON.parse(data);
    if (jsonmessage.type === "QUESTION") {
      this.setState({
        question: jsonmessage.message,
        question_visibility: true,
        searching: true
      });
    } else if (jsonmessage.type === "ANSWER") {
      this.setState({ answer: jsonmessage.message, answer_visibility: 1 });
      setTimeout(() => {
        this.setState({
          question_visibility: false,
          answer_visibility: false,
          searching: false
        });
      }, 9000);
    } else if (jsonmessage.type === "INFO") {
      this.setState({ info: jsonmessage.message, info_visibility: true });
      setTimeout(() => {
        this.setState({
          info_visibility: false
        });
      }, 6000);
    }
  };

  render() {
    return (
      <div className={styles.view}>
        <div className={styles.container}>
          {this.state.connected ? (
            this.state.searching ? (
              <div>
                <Fade in={this.state.question_visibility} timeout={200}>
                  <div className={styles.messageQuestion}>
                    {this.state.question}
                  </div>
                </Fade>
                {!this.state.answer_visibility ? (
                  <Spinner animation="grow" variant="dark" role="status" />
                ) : (
                  <Fade in={this.state.answer_visibility} timeout={100}>
                    <div className={styles.answerContainer}>
                      <strong>{this.state.answer}</strong>
                    </div>
                  </Fade>
                )}
              </div>
            ) : (
              <div>
                <div className={styles.messageQuestion}>
                  {this.getGameStatus()}
                </div>
                {this.state.gameIsOn ? (
                  <Spinner animation="border" variant="dark" role="status" />
                ) : null}
              </div>
            )
          ) : (
            <Button
              variant="danger"
              size="lg"
              onClick={function() {
                window.location.reload();
              }}
            >
              RECARGAR
            </Button>
          )}
        </div>
        <Fade in={this.state.info_visibility} timeout={100}>
          <div className={styles.infoContainer}>{this.state.info}</div>
        </Fade>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    url: state.url,
    authenticated: state.authenticated
  };
};

export default connect(mapStateToProps)(ConfettibotApp);
