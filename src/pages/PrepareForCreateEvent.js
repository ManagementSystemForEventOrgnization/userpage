import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import EventInfor from '../containers/event/EventInfor/EventInfor';

class PrepareForCreateEvent extends Component {
  render() {
    const urlIMG =
      'https://res.cloudinary.com/dklfyelhm/image/upload/v1584932729/Event/hand_iind0n.png';

    return (
      <div className="pt-3 pl-5 pr-5">
        <div className="d-flex justify-content-center">
          <Link to="/">
            <img alt="logo" src={urlIMG} />
          </Link>
        </div>

        <EventInfor />
      </div>
    );
  }
}

export default PrepareForCreateEvent;
