import React from 'react';
import { connect } from 'react-redux';
// import { Button } from 'antd';
import { Button } from 'react-bootstrap';

import DropContainer from './templates/DropContainer';
import Header from '../share/_layout/Header';
import MenuBlockList from './MenuBlockList';
import { eventActions } from 'action/event.action';
import { userActions } from 'action/user.action';
import HeaderBlock from './templates/ui-elements/blocks/Header';

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      editable: true,
      currentRoute: 'home',
    };
  }

  componentDidMount = () => {
    // using to test apply event
    // need to remove after completely

    const { getCurrentUser } = this.props;
    if (getCurrentUser) {
      getCurrentUser();
    }
  };

  toggleCollapsed = (value) => {
    this.setState({
      collapsed: value,
    });
  };

  handleSavePage = () => {
    const { savePage } = this.props;
    const { currentRoute } = this.state;

    this.setState({
      editable: false,
    });
    this.forceUpdate();

    const data = document.getElementById('drop-container');

    savePage(currentRoute, data.outerHTML, this.state.editable);
  };

  handleSaveEvent = () => {
    const { saveEvent, blocks, id, unEditableHtml } = this.props;

    const headerHtml = document.getElementById('header-block');

    saveEvent(
      blocks,
      id ? id : '5eb2889d5da55d2fa4b78ced',
      unEditableHtml,
      true,
      headerHtml.outerHTML
    );
  };

  handleBack = () => {};

  render() {
    const { collapsed, editable } = this.state;
    const { id, match } = this.props;
    const textStyle = {
      color: 'white',
    };

    return (
      <div className=" create-event">
        <div className="fixed-top ">
          <Header />
        </div>

        <div className="d-flex flex-row-reverse">
          <Button
            className="mr-5 ml-1"
            variant="primary"
            onClick={this.handleSaveEvent}
          >
            <a
              href={id ? `/event/${id}` : 'event/5eb259b562bd742fe41c1205'}
              target="_blank"
              rel="noopener noreferrer"
              style={textStyle}
            >
              Finish
            </a>
          </Button>

          <Button variant="success" onClick={this.handleSaveEvent}>
            <a
              href={id ? `/preview/${id}` : 'preview/5eb259b562bd742fe41c1205'}
              target="_blank"
              style={textStyle}
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
            <div id="header-block">
              <HeaderBlock
                key="header"
                id="header"
                editable={false}
                match={match}
              />
            </div>
            <DropContainer match={match} editable={editable} />
          </div>
        </div>

        <div className="d-flex   flex-row-reverse mr-5 mb-5">
          <Button
            variant="info"
            className="mr-1 ml-1"
            onClick={this.handleSavePage}
          >
            Next
          </Button>

          <Button
            variant="secondary"
            className="mr-1 ml-1"
            onClick={this.handleBack}
          >
            Back
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.event.id,
  pending: state.event.pending,
  blocks: state.event.blocks,
  unEditableHtml: state.event.unEditableHtml,
});

const mapDispatchToProps = (dispatch) => ({
  savePage: (route, innerHtml, editable) =>
    dispatch(eventActions.savePage(route, innerHtml, editable)),

  getCurrentUser: () => dispatch(userActions.getCurrentUser()),

  saveEvent: (block, eventId, unEditableHtml, isPreview, headerHtml) =>
    dispatch(
      eventActions.saveEvent(
        block,
        eventId,
        unEditableHtml,
        isPreview,
        headerHtml
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
