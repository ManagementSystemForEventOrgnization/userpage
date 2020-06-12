import React, { Component } from 'react';
import {
  Widget,
  addResponseMessage,
  //   addLinkSnippet,
  // addUserMessage,
} from 'react-chat-widget';
import io from 'socket.io-client';
import { v4 as uuid } from 'uuid';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
    };
    this.socket = io('https://417ce7227616.ngrok.io');
  }

  componentDidMount() {
    addResponseMessage('Wellcome to our system !!! Can we help you ?');

    let currentSocket = localStorage.getItem('currentSocket');
    const now = new Date();

    if (!currentSocket) {
      const socketId = localStorage.getItem('userId') || uuid();
      currentSocket = {
        id: socketId,
        expiry: now.getTime() + 24 * 60 * 60 * 1000,
      };
      localStorage.setItem('currentSocket', JSON.stringify(currentSocket));
    } else {
      currentSocket = JSON.parse(currentSocket);
      if (now.getTime() > currentSocket.expiry) {
        localStorage.removeItem('currentSocket');
      }
    }

    this.setState({ currentSocket });
    //client-send-Username
    this.socket.emit('client-send-Username', {
      _id: currentSocket.id,
      fullName: localStorage.getItem('username') || `guest ${currentSocket.id}`,
    });

    // get old chatcontent whenever reload(in expiry time)

    //listen to  login-failure event
    this.socket.on('login-failure', (data) => {
      console.log('login failure : ', data);
      localStorage.removeItem('currentSocket');
      // should create new socket
    });

    // *** don't need to socket.on this event
    // this.socket.on('server-send-message', (data) => {
    //   console.log('server-send-message : ', data);
    //   addResponseMessage(data.nd.content);
    // });

    //listen to admin-reply event
    this.socket.on('admin-reply', (data) => {
      addResponseMessage(data.content);
    });
  }

  handleSubmit = (value) => {
    console.log(value);
  };

  handleNewUserMessage = (newMessage) => {
    const { currentSocket } = this.state;
    this.socket.emit('user-send-message', {
      content: newMessage,
      id: currentSocket.id,
      fullName: `guest ${currentSocket.id}`,
    });
  };

  render() {
    return (
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          //   profileAvatar={logo}
          title="Event in your hand"
          subtitle="Contact with admin"
          addUserMessage={() => {
            // debugger;
            console.log(1);
            return;
          }}
        />
      </div>
    );
  }
}

export default Chat;
