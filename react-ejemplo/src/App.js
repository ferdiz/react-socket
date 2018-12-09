import React, { Component } from "react";
import socketIOClient from "socket.io-client";
class App extends Component {
  constructor() {
    super();
    this.chatear = this.chatear.bind(this);
    this.state = {
      socket: null,
      response: false,
      endpoint: "http://127.0.0.1:4001"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("chat", data => this.setState({ response: data , socket}));
  }
  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        <p> Ultimo mensaje: {response}</p>
        <input id="chat" />
        <button onClick={this.chatear}>Enviar</button>
      </div>
    );
  }

  chatear(){
    this.state.socket.emit("chat", document.getElementById("chat"));
  }
}
export default App;