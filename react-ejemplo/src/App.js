import React, { Component } from "react";
import socketIOClient from "socket.io-client";
class App extends Component {
  constructor() {
    super();
    this.chatear = this.chatear.bind(this);
    this.state = {
      socket: null,
      response: false,
      endpoint: "http://192.168.0.42:4001/"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    this.setState({socket})
    socket.on("chat", data => this.setState({ response: data}));
  }
  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>

      inpu

        <p> Ultimo mensaje: {response}</p>
        <input id="chat" />
        <button onClick={this.chatear}>Enviar</button>
      </div>
    );
  }

  chatear(){
    this.state.socket.emit("chat", document.getElementById("chat").value);
  }
}
export default App;