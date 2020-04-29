import React from 'react';

import GeneralInfoEventModal from '../containers/event/GeneralInfoEventModal';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="banner">
        <h1 className="title-name">EVENT IN YOUR HAND</h1>
        <h2>Dễ dàng hơn với việc quản lý và tổ chức sự kiện ngay từ hôm nay</h2>
        <GeneralInfoEventModal />
      </div>
    );
  }
}

export default Banner;
