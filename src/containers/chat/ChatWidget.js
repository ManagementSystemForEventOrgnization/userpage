import React, { Component } from 'react';
import {
  Widget,
  addResponseMessage,
  //   addLinkSnippet,
  //   addUserMessage,
} from 'react-chat-widget';
import io from 'socket.io-client';
import { v4 as uuid } from 'uuid';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem('userId') || uuid(),
    };
    this.socket = null;
  }

  componentDidMount() {
    addResponseMessage('Welcome to this awesome chat!');
  }

  handleNewUserMessage = (newMessage) => {
    const { userId } = this.state;
    this.socket.emit('user-send-message', {
      content: newMessage,
      id: userId,
      fullName: userId,
    });

    // Now send the message throught the backend API
  };

  UNSAFE_componentWillMount = () => {
    this.socket = io('http://localhost:4000');
    this.socket.on('admin-reply', (data) => {
      console.log(data);
    });
  };
  render() {
    return (
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          //   profileAvatar={logo}
          title="My new awesome title"
          subtitle="And my cool subtitle"
        />
      </div>
    );
  }
}

export default Chat;
