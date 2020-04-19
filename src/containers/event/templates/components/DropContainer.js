import React from "react";
import { connect } from 'react-redux'
import { ReactSortable } from "react-sortablejs";

import ImageBlock from './ui-elements/atoms/Image';
import TextBlock from './ui-elements/atoms/Text';
import HeaderBlock from './ui-elements/blocks/Header';
// import Banner2 from './ui-elements/blocks/banner/Banner2'
// import Banner1 from './ui-elements/blocks/banner/Banner1'


// import { createEventConstants } from '../../../../constants/index';
import { eventActions } from "../../../../action/event.action";


const textBlockOption = ({ key, style, content }) => <TextBlock
  key={key}
  style={style}
  content={content}
/>

const headerBloclOption = ({ key, style, content }) => <HeaderBlock
  key={key}
  style={style}
  content={content}
/>

const imageBlockOption = ({ key, url, editable }) => <ImageBlock
  key={key}
  editable={editable}
  url={url}
/>


class DropContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      dropList:
        [
          {
            id: 1,
            url: '/bg-2.jpg',
            options: imageBlockOption
          },
          {
            id: 2,
            options: textBlockOption
          },
          {
            id: 3,
            options: headerBloclOption
          },
        ]
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
            console.log(item)
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

