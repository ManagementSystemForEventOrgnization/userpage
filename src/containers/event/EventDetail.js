import React from 'react';
import { connect } from 'react-redux';
import { eventActions } from '../../action/event.action';
class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
    };
  }

  componentDidMount = () => {
    // get id from url
    const { id, getEventDetail } = this.props;

    const eventId = id ? id : '5eb259b562bd742fe41c1205'; // should get id from url
    getEventDetail(eventId);
  };

  render() {
    // const { page } = this.props;
    // const blocks = page ? page[0].rows : [];

    const { blocks } = this.props;
    // console.log(blocks);

    // const temp =
    //   '((e8170588-74b1-421b-8c49-00784f216c06, false, {"collapse":false,"margin":[1,1,1,1],"padding":[7,1,1,7],"url":"","bgColor":"white","opacity":0.3}) =>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ui_elements_blocks_eventDescription_EventDescription2__WEBPACK_IMPORTED_MODULE_17__["default"], {       key: id,       id: id,       editable: editable,       style: style ? JSON.parse(style) : {},       __self: undefined,       __source: {         fileName: _jsxFileName,         lineNumber: 212,         columnNumber: 11       }     }))()';

    return <div>{blocks.map((item) => item.options(item.id, false))}</div>;
  }
}

const mapStateToProps = (state) => ({
  blocks: state.event.blocks,
  id: state.event.id,
  page: state.event.page,
});

const mapDispatchToProps = (dispatch) => ({
  getEventDetail: (eventId) => dispatch(eventActions.getEventDetail(eventId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
