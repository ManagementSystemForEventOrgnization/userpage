import React, { Component } from 'react';
import {
  Widget,
  addResponseMessage,
  //   addLinkSnippet,
  addUserMessage,
} from 'react-chat-widget';
import io from 'socket.io-client';
import { v4 as uuid } from 'uuid';
import { userActions } from 'action/user.action';
import { connect } from 'react-redux';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
    };
    this.socket = io(process.env.REACT_APP_CHAT_SERVER);
  }

  componentDidMount() {
    const { getChatHistory } = this.props;
    const userId = localStorage.getItem('userId');
    if (userId) {
      getChatHistory(userId);
    }

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

    this.socket.on('login-failure', (data) => {
      localStorage.removeItem('currentSocket');
      // should create new socket
    });

    //listen to admin-reply event
    this.socket.on('admin-reply', (data) => {
      addResponseMessage(data.content);
    });
  }

  handleNewUserMessage = (newMessage) => {
    const { currentSocket } = this.state;
    this.socket.emit('user-send-message', {
      content: newMessage,
      id: currentSocket.id,
      fullName: `guest ${currentSocket.id}`,
    });
  };

  renderChatHistory = (chatHistory) =>
    chatHistory.map((item) =>
      item.sender === 'admin'
        ? addResponseMessage(item.content)
        : addUserMessage(item.content)
    );

  componentDidUpdate = (prevProps) => {
    const { chatHistory } = this.props;
    if (prevProps.chatHistory && chatHistory) {
      if (prevProps.chatHistory.length === 0 && chatHistory.length > 0) {
        this.renderChatHistory(chatHistory);
      }
    }
  };

  render() {
    return (
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          title="Event in your hand"
          subtitle="Contact with admin"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    chatHistory: state.user.chatHistory,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getChatHistory: (userId) => dispatch(userActions.getChatHistory(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
