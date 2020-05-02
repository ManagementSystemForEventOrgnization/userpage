import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';

import ImageBlock from '../../atoms/Image';
import TextBlock from '../../atoms/Text';
import { eventActions } from '../../../../../../../action/event.action';

const temp = [1, 2, 3, 4, 5];
const high = 10;
const title = 'Sponsor';
const iconStyle = {
  fontSize: '20px',
};
const urlDefault =
  'https://easydrawingart.com/wp-content/uploads/2019/07/How-to-Draw-a-Chibi-Girl.jpg';

class Sponsor1Block extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = style
      ? { ...style }
      : {
          sponsor: [1, 2, 3, 4],
        };
  }

  componentDidMount = () => {
    const { editable } = this.props;
    if (editable) {
      this.handleStoreBlock();
    }
  };
  addPhoto = () => {
    const { sponsor } = this.state;
    this.setState({
      sponsor: sponsor.push(sponsor.length + 1),
    });
  };
  removePhoto = () => {
    const { sponsor } = this.state;
    this.setState({
      sponsor: sponsor.pop(sponsor.length - 1),
    });
  };

  handleStoreBlock = () => {
    const { blocks, storeBlocksWhenCreateEvent, id } = this.props;
    const currentStyle = this.state;

    let item = blocks.find((ele) => ele.id === id);
    if (item) {
      const index = blocks.indexOf(item);
      item.style = currentStyle;
      storeBlocksWhenCreateEvent([
        ...blocks.slice(0, index),
        item,
        ...blocks.slice(index + 1, blocks.length),
      ]);
    }
  };

  render() {
    const style = {
      margin: '10px',
      padding: '10px',
    };
    const { sponsor } = this.state;

    return (
      <div className="d-flex child-block" style={style}>
        <div style={style} className="container">
          <div className="row">
            <div className="col-sm-12">
              <TextBlock
                content={title}
                child={true}
                newStyle={{
                  fontWeight: 'normal',
                  fontSize: 60,
                }}
              />
            </div>
          </div>

          <hr></hr>

          <div className="child-block d-flex">
            <Row className="child-block" gutter={8}>
              {sponsor.map((item) => (
                <Col className="gutter-row" key={item} span={4}>
                  <ImageBlock url={urlDefault} height={high} leftModal={true} />
                </Col>
              ))}
            </Row>
            <div className="icons-handle">
              <PlusCircleTwoTone
                style={iconStyle}
                className="mt-3"
                onClick={this.addPhoto}
              />
              <MinusCircleTwoTone
                style={iconStyle}
                className="mt-3"
                onClick={this.removePhoto}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  blocks: state.event.blocks,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sponsor1Block);
