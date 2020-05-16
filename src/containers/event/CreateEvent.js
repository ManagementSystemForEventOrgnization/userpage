import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import DropContainer from './templates/components/DropContainer';
import Header from '../share/_layout/Header';
import MenuBlockList from './MenuBlockList';
import { eventActions } from '../../action/event.action';
import history from '../../utils/history';

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      editable: true,
    };
  }

  toggleCollapsed = (value) => {
    this.setState({
      collapsed: value,
    });
  };

  handleSaveEvent = () => {
    // const { blocks, id, saveEvent, match } = this.props;
    // const eventId = id ? id : '5eb259b562bd742fe41c1205';
    // /
    const { storeHtml } = this.props;

    const data = document.getElementById('drop-container');
    storeHtml(data.innerHTML);
    // let temp = eventActions.storeHtml(data);
    // console.log(temp);
    history.push('/confirm');
  };

  render() {
    const { collapsed, editable } = this.state;
    const { id, pending, match } = this.props;

    return (
      <div className=" create-event">
        <div className="fixed-top ">
          <Header />
        </div>

        <div className="d-flex flex-row-reverse">
          <Button
            className="mr-5 ml-3"
            type="primary"
            size="large"
            loading={pending}
            onClick={this.handleSaveEvent}
          >
            Public
          </Button>

          <Button type="dashed" size="large" onClick={this.handleSaveEvent}>
            <a
              href={id ? `/preview/${id}` : 'preview/5eb259b562bd742fe41c1205'}
              target="_blank"
              rel="noopener noreferrer"
            >
              Preview
            </a>
          </Button>
        </div>

        <div className="d-flex">
          <MenuBlockList toggleCollapsed={this.toggleCollapsed} />

          <div
            className={
              collapsed
                ? '  mt-1 drop-area  mb-5 move-right p-3'
                : ' mt-1 drop-area  mb-5 p-3'
            }
          >
            <DropContainer match={match} editable={editable} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.event.id,
  pending: state.event.pending,
  blocks: state.event.blocks,
});

const mapDispatchToProps = (dispatch) => ({
  storeHtml: (data) => dispatch(eventActions.storeHtml(data)),
  saveEvent: (eventId, block) =>
    dispatch(eventActions.saveEvent(eventId, block)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
