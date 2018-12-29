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
    this.setState({ socket })
    socket.on("chat", data => this.setState({ response: data }));
  }
  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        <p> Ultimo mensaje: {response}</p>
        <input id="chat" />
        <button onClick={this.chatear}>Enviar</button><br></br>
        <svg height="100" width="100">
          <defs>
            <clipPath id="circleView">
              <polygon points="7,25 50,0 93,25 93,75 50,100 7,75" style={{ fill: "lime", stroke: "purple", strokeWidth: 1 }} />
            </clipPath>
          </defs>

          <image width="100" height="100" href="pasto.jpeg" clipPath="url(#circleView)" />
        </svg>
      </div>
    );
  }

  chatear() {
    this.state.socket.emit("chat", document.getElementById("chat").value);
  }
}
export default App;