import React from "react";
import { connect } from 'react-redux'
import { ReactSortable } from "react-sortablejs";

import ImageBlock from './ui-elements/Image';
import TextBlock from './ui-elements/Text';

import { createEventConstants } from '../../../../constants/index';
const { posterStyle, addressStyle, typeOfEventStyle, nameEventStyle, quantityStyle } = createEventConstants;

const textBlockOption = ({ key, style, content }) => <TextBlock
  key={key}
  style={style}
  content={content}
/>

const imageBlockOption = ({ key, style, url }) => <ImageBlock
  key={key}
  style={style}
  url={url}
/>


class DropContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropList: [
        {
          id: 1,
          url: '/bg-2.jpg',
          style: posterStyle,
          options: imageBlockOption
        },
        {
          id: 2,
          content: this.props.nameEvent,
          style: nameEventStyle,
          options: textBlockOption
        },
        {
          id: 3,
          content: this.props.address,
          style: addressStyle,
          options: textBlockOption
        },
        {
          id: 4,
          content: `Số lượng: ${this.props.quantity}`,
          style: quantityStyle,
          options: textBlockOption
        },
        {
          id: 5,
          content: this.props.typeOfEvent,
          style: typeOfEventStyle,
          options: textBlockOption
        },
        {
          id: 6,
          content: this.props.typeOfEvent,
          style: typeOfEventStyle,
          options: textBlockOption
        },

      ],
    }
  }

  handleSetDropList = (dropList) => {
    this.setState({ dropList }
    )
  }

  render() {
    const { dropList } = this.state;
    return (
      <div className="drop-container" >

        <ReactSortable
          className="drop-container"
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


})

export default connect(mapStateToProps, null)(DropContainer)

