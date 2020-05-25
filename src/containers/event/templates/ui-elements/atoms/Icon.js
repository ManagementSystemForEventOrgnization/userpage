import React from 'react';
import { connect } from 'react-redux';
import { Modal, Radio } from 'antd';

import { IconFont, iconName } from '../../../constants/atom.constant';
import { IconState } from '../stateInit/IconState';
import { eventActions } from '../../../../../../action/event.action';

class IconBlock extends React.Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = style
      ? { ...style }
      : {
          ...IconState(iconName),
        };
  }

  componentDidMount = () => {
    const { editable } = this.props;
    this.setState({
      iconNameList: iconName,
    });
    if (editable) this.handleStoreBlock();
  };

  // common function
  onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,
    });
    setTimeout(this.handleStoreBlock(), 3000);
  }

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
    const { iconNameList, styleFormat } = this.state;
    const { editable } = this.props;

    return (
      <div className="child-block">
        <div
          className="mt-2"
          onClick={() => this.onChangeValue(true, 'isDesign')}
        >
          Icons
          <IconFont type={styleFormat} />
        </div>

        {editable && (
          <Modal
            title="Icons design"
            visible={this.state.isDesign}
            onOk={this.handleOk}
            onCancel={() => this.onChangeValue(false, 'isDesign')}
            width={500}
            footer={[]}
          >
            {/* list datepicker in modal */}
            <div>
              <Radio.Group
                value={styleFormat}
                onChange={(e) =>
                  this.onChangeValue(e.target.value, 'styleFormat')
                }
              >
                {iconNameList.map((dateformat) => (
                  <Radio value={dateformat} key={dateformat}>
                    <IconFont type={dateformat} />
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // map state of store to props
  blocks: state.event.blocks,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),
});
export default connect(mapStateToProps, mapDispatchToProps)(IconBlock);
