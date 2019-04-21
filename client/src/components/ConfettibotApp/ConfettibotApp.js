import React from "react";
import Websocket from "react-websocket";
import { Jumbotron, Fade, Spinner } from "react-bootstrap";
import styles from "./confettibotapp.module.scss";
class ConfettibotApp extends React.Component {
  state = {
    searching: false,
    question: "",
    question_visibility: false,
    answer: "",
    answer_visibility: false,
    info: "",
    info_visibility: true
  };

  fadeOut() {}

  handleData(data) {
    console.log("data:" + data);
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
      }, 8000);
    } else if (jsonmessage.type === "INFO") {
      this.setState({ info: jsonmessage.message, info_visibility: true });
      setTimeout(() => {
        this.setState({
          info_visibility: false
        });
      }, 5000);
    }
  }

  render() {
    console.log();
    return (
      <div>
        <Jumbotron className={styles.outputJumbotron}>
          {this.state.searching ? (
            <div>
              <Fade in={this.state.question_visibility} timeout={100}>
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
          )}

          <Websocket
            url={window.location.origin.replace(/^http/, "ws") + "/api/app"}
            onMessage={this.handleData.bind(this)}
          />
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

export default ConfettibotApp;
