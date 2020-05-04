import React from 'react';
import { connect } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';

import { eventActions } from '../../../../action/event.action';
import dataTest from '../data/dataTest';

class DropContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropList: [
        ...dataTest[0].value,
        ...dataTest[1].value,
        ...dataTest[2].value,
        ...dataTest[3].value,
        ...dataTest[4].value,
        ...dataTest[5].value,
        ...dataTest[6].value,
        ...dataTest[7].value,
        ...dataTest[8].value,
        ...dataTest[9].value,
        ...dataTest[10].value,
        ...dataTest[11].value,
        ...dataTest[12].value,
        ...dataTest[13].value,
      ],
    };
  }

  componentWillMount = () => {
    const { dropList } = this.state;
    const { storeBlocksWhenCreateEvent } = this.props;
    // console.log('TCL droplist from Dropcontainer : ', dropList);
    storeBlocksWhenCreateEvent(dropList);
  };

  handleSetDropList = (dropList) => {
    const { storeBlocksWhenCreateEvent } = this.props;
    // console.log('TCL handle set droplist from DropContainer  : ', dropList);
    this.setState({ dropList });
    storeBlocksWhenCreateEvent(dropList);
  };

  render() {
    const { dropList } = this.state;
    const eventName = 'Conference';
    return (
      <div className="drop-container">
        <ReactSortable
          className="drop-container"
          id="drop-container"
          sort={true}
          group={{
            name: 'shared',
            pull: true,
            put: true,
          }}
          animation={300}
          delayOnTouchStart={true}
          delay={3}
          list={dropList}
          setList={this.handleSetDropList}
        >
          {dropList.map((item, index) => {
            return item.options({
              key: index,
              id: item.id,
              editable: true,
              nameEvent: eventName,
            });
          })}
        </ReactSortable>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // nameEvent: state.event.nameEvent || 'Tên sự kiện demo',
  // typeOfEvent: state.event.category || 'Loại sự kiện demo',
  // address: state.event.locationName || 'Địa chỉ demo',
  // quantity: state.event.quantity,
  // time: state.event.time,
  blocks: state.event.blocks,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropContainer);
