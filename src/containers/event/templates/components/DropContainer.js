import React from "react";
import { connect } from 'react-redux'
import { ReactSortable } from "react-sortablejs";

import { eventActions } from "../../../../action/event.action";
import dataTest from '../data/dataTest';


class DropContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropList: [...dataTest[2].value, ...dataTest[3].value, ...dataTest[8].value, ...dataTest[11].value]
    }
  }

  componentDidMount = () => {
    const { dropList } = this.state;
    const { storeBlocksWhenCreateEvent } = this.props;
    storeBlocksWhenCreateEvent(dropList);

  }

  handleSetDropList = (dropList) => {
    const { storeBlocksWhenCreateEvent } = this.props;
    storeBlocksWhenCreateEvent(dropList);
    this.setState({ dropList })
  }

  render() {
    const { dropList } = this.state;
    return (
      <div className="drop-container" >

        <ReactSortable
          className="drop-container"
          id="drop-container"
          sort={true}
          group={{
            name: "shared",
            pull: true,
            put: true
          }}
          animation={300}
          delayOnTouchStart={true}
          delay={3}
          list={dropList}
          setList={this.handleSetDropList}
        >
          {dropList.map(item => {
            return item.options({
              key: item.id,
              editable: true,
              style: item.style ? item.style : {},
              content: item.content ? item.content : "",
              url: item.url ? item.url : "",
            })
          })}

        </ReactSortable>

      </div>
    );
  };
}

const mapStateToProps = state => ({
  nameEvent: state.event.nameEvent || 'Tên sự kiện demo',
  typeOfEvent: state.event.category || 'Loại sự kiện demo',
  address: state.event.locationName || 'Địa chỉ demo',
  quantity: state.event.quantity,
  time: state.event.time,
  blocks: state.event.blocks,
})

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) => dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),

});

export default connect(mapStateToProps, mapDispatchToProps)(DropContainer)

