import React from "react";
import { connect } from "react-redux";
import { Jumbotron, Fade, Spinner, Button } from "react-bootstrap";
import styles from "./confettibotapp.module.scss";

class ConfettibotApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      question: "",
      question_visibility: false,
      answer: "",
      answer_visibility: false,
      info: "",
      info_visibility: true,
      connected: true
    };
    this.handleData = this.handleData.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount(props) {
    this.setUpWebsocket();
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

  componentWillUnmount() {
    if (!this.ws) return;

    try {
      this.ws.close();
    } catch (err) {
      console.log("Error in closing ws: ", err);
    }
  }

  sendMessage(message) {
    this.ws.send(message);
  }

  handleData(data) {
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
  }

  render() {
    return (
      <div>
        <Jumbotron className={styles.outputJumbotron}>
          {this.state.connected ? (
            this.state.searching ? (
              <div>
                <Fade in={this.state.question_visibility} timeout={200}>
                  <div className={styles.messageQuestion}>
                    {this.state.question}
                  </div>
                </Fade>
                {!this.state.answer_visibility ? (
                  <Spinner animation="grow" variant="primary" role="status" />
                ) : (
                  <Fade in={this.state.answer_visibility} timeout={100}>
                    <div className={styles.answerContainer}>
                      <p className={styles.messageAnswer}>
                        <strong>{this.state.answer}</strong>
                      </p>
                    </div>
                  </Fade>
                )}
              </div>
            ) : (
              <div>
                <Spinner animation="border" variant="dark" role="status" />
                <p className={styles.messageQuestion}>
                  Esperando siguiente pregunta...
                </p>
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
        </Jumbotron>
        <div className={styles.infoMessage}>
          <Fade in={this.state.info_visibility} timeout={100}>
            <p className={styles.messageInfo}>{this.state.info}</p>
          </Fade>
        </div>
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
