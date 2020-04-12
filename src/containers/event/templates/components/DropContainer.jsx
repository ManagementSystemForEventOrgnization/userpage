import React from "react";
import { connect } from 'react-redux'
import { ReactSortable } from "react-sortablejs";

import ButtonBlock from './ui-elements/Button';
import TextBlock from './ui-elements/Text';
import ImageBlock from './ui-elements/Image';
import DropdownBlock from './ui-elements/DropDown';
import TableBlock from './ui-elements/Table';
import DividerBlock from './ui-elements/Devider'
import StepBlock from './ui-elements/Step';
import DatepickersBlock from './ui-elements/Datepicker';
import TimepickersBlock from './ui-elements/Timepicker';



const posterStyle = {
  width: '100%',
  height: '60vh'
}
const addressStyle = {
  position: 'absolute',
  top: '65%',
  left: '10%',
  fontSize: '20px'
}
const typeOfEventStyle = {
  position: 'absolute',
  top: '73%',
  right: '1%',
}
const nameEventStyle = {
  position: 'absolute',
  top: '25%',
  left: '10%',
  fontWeight: 'bolder',
  fontSize: '50px'
}
const quantityStyle = {
  position: 'absolute',
  top: '73%'
}



class DropContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropList: [
        {
          id: 1,
          type: "image",
          name: 'Image',
          url: '/bg-2.jpg',
          style: posterStyle
        },
        {
          id: 2,
          type: "text",
          name: 'Text',
          content: this.props.nameEvent,
          style: nameEventStyle
        },
        {
          id: 3,
          type: "text",
          name: 'Text',
          content: this.props.address,
          style: addressStyle
        },
        {
          id: 4,
          type: "text",
          name: 'Text',
          content: `Số lượng: ${this.props.quantity}`,
          style: quantityStyle
        },
        {
          id: 5,
          type: "text",
          name: 'Text',
          fontSize: '15px',
          content: this.props.typeOfEvent,
          style: typeOfEventStyle
        },
        {
          id: 6,
          type: "text",
          name: 'Text',
          fontSize: '15px',
          content: this.props.typeOfEvent,
          style: typeOfEventStyle
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

            switch (item.type) {
              case "button":
                return <ButtonBlock key={item.id} />;
              case "dropdown":
                return <DropdownBlock key={item.id} options={item.options} />;
              case "text":
                return <TextBlock key={item.id} style={item.style} content={item.content} />;
              case "table":
                return <TableBlock key={item.id} />;
              case 'image':
                return <ImageBlock key={item.id} url={item.url} style={item.style} />
              case 'divider':
                return <DividerBlock key={item.id} />
              case 'step':
                return <StepBlock key={item.id} />
              case 'datepicker':
                return <DatepickersBlock key={item.id} />
              case 'timepicker':
                return <TimepickersBlock key={item.id} />

              default:
                return <span key="123456" className="mt-2">{item.type}</span>;

            }
          })}
        </ReactSortable>



      </div>
    );
  };
}

const mapStateToProps = state => ({
  nameEvent: state.event.nameEvent || 'Tên sự kiện demo',
  typeOfEvent: state.event.typeOfEvent || 'Loại sự kiện demo',
  address: state.event.address || 'Địa chỉ demo',
  quantity: state.event.quantity

})

export default connect(mapStateToProps, null)(DropContainer)

