import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export default class NotFoundPage extends Component {
  render() {
    const style = {
      background: `url(https://res.cloudinary.com/eventinyourhand/image/upload/v1593323532/publics/not-found_ytto2w.jpg)`,
      backgroundSize: 'cover',
      width: '100%',
      height: '100vh',
      overFlow: 'hidden',
      backgroundPosition: 'center',
    };
    const buttonStyle = {
      position: 'absolute',
      top: '65%',
      left: '45%',
    };

    return (
      <div style={style}>
        <Link to="/" style={buttonStyle}>
          <Button size="large" type="danger">
            Back to HOME
          </Button>
        </Link>
      </div>
    );
  }
}
