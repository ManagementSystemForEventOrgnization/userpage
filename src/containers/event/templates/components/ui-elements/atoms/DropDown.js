import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Input, Modal, Select, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import { eventActions } from '../../../../../../action/event.action';
import TextBlock from './Text';
import { DropDownState } from '../stateInit/DropDownState';

let index = 0;

class DropDownBlock extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;

    this.state = style
      ? { ...style }
      : {
          ...DropDownState(this.props),
        };
  }

  componentDidMount = () => {
    const { editable } = this.props;
    if (editable) {
      this.handleStoreBlock();
    }
  };

  // common function
  onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,
    });
    this.handleStoreBlock();
  }

  onClickAdd = () => {
    const { txtname, items } = this.state;

    items.push({
      id: uuid(),
      name: txtname || `add item ${index++}`,
    });
    this.setState({
      items,
      txtname: '',
    });
    this.handleStoreBlock();
  };

  OnClickOption = (e) => {
    const { isAddOption } = this.state;
    this.setState({
      isAddOption: !isAddOption,
    });
  };

  removeOption = (item) => {
    const { idMenu } = this.props;
    const items = this.state.items.filter((e) => e.id !== item.id);
    console.log(idMenu, items);
    this.setState({
      items,
    });
    this.handleStoreBlock();
  };

  onChangeTextBlock = (idItem, value) => {
    const { items } = this.state;
    const item = items.find((ele) => ele.id === idItem);
    const index = items.indexOf(item);
    item.name = value;
    if (index === -1) return;
    else {
      this.setState({
        items: [
          ...items.slice(0, index),
          item,
          ...items.slice(index + 1, items.length),
        ],
      });
    }

    this.handleStoreBlock();
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
    const { key, editable } = this.props;
    const { items, isAddOption } = this.state;

    const constructOptions = (options) =>
      options.map((data) => (
        <Select.Option key={uuid()} value={data.id}>
          {data.name}
        </Select.Option>
      ));

    return (
      <div className="sortable-element child-block">
        <Select
          key={key}
          id={'dropdown' + uuid()}
          style={{ width: 100 }}
          onClick={() => this.onChangeValue(true, 'visible')}
        >
          {constructOptions(items)}
        </Select>

        {editable && (
          <Modal
            title="Dropdown"
            visible={this.state.visible}
            onOk={() => this.onChangeValue(false, 'visible')}
            onCancel={() => this.onChangeValue(false, 'visible')}
            width={400}
            style={{ marginLeft: '30%' }}
          >
            <div>
              {items.map((item) => (
                <div key={item.id} className="d-flex row mt-2 ">
                  <div className="col">
                    <TextBlock
                      content={item.name}
                      child={true}
                      handleOnChangeTextBlock={(value) =>
                        this.onChangeTextBlock(item.id, value)
                      }
                    ></TextBlock>
                  </div>
                  <div className="col-3">
                    <DeleteOutlined onClick={() => this.removeOption(item)} />
                  </div>
                </div>
              ))}

              {isAddOption ? (
                <div className="d-flex flex-row mt-3">
                  <Input
                    value={this.state.txtname}
                    onChange={(e) =>
                      this.onChangeValue(e.target.value, 'txtname')
                    }
                  />
                  <Button
                    type="primary"
                    onClick={() => {
                      this.onClickAdd();
                      this.OnClickOption();
                    }}
                  >
                    done{' '}
                  </Button>
                </div>
              ) : (
                ''
              )}

              <Button
                className="mt-5  "
                style={{ marginLeft: '30%' }}
                onClick={this.OnClickOption}
              >
                {' '}
                <PlusOutlined /> Add Item
              </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(DropDownBlock);
