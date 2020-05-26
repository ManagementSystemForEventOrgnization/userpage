import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import { eventActions } from 'action/event.action';
import { userActions } from 'action/user.action';

import DropContainer from './templates/DropContainer';
import Header from 'containers/share/_layout/Header';
import MenuBlockList from './MenuBlockList';
import NavigationMenu from './NavigationMenu';
import EditableHeader from './Header';

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      editable: true,
      currentIndex: 0,
      currentPage: props.currentPage,
    };
  }

  getCurrentIndex = () => {
    const { pages, currentPage } = this.props;
    let temp = 0;
    for (let index in pages) {
      if (pages[index].child.length === 0 && pages[index].id === currentPage) {
        temp = index;
        break;
      } else {
        for (let i in pages[index].child) {
          if (pages[index].child[i].id === currentPage) {
            temp = index;
            break;
          }
        }
      }
    }
    this.setState({
      currentIndex: +temp,
      currentPage: currentPage,
    });
  };

  getNextId = () => {
    const { pages } = this.props;
    const { currentIndex } = this.state;
    if (pages[currentIndex + 1].child.length === 0) {
      return pages[currentIndex + 1].id;
    }
    return pages[currentIndex + 1].child[0].id;
  };

  getNextIdChild = () => {
    const { pages, currentPage } = this.props;
    const { currentIndex } = this.state;
    const index = pages[currentIndex].child.findIndex(
      (item) => item.id === currentPage
    );
    return index === pages[currentIndex].child.length - 1
      ? this.getNextId()
      : pages[currentIndex].child[index + 1].id;
  };

  componentDidMount = () => {
    this.getCurrentIndex();
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.currentPage !== this.props.currentPage) {
      this.getCurrentIndex();
    }
  };

  toggleCollapsed = (value) => {
    this.setState({
      collapsed: value,
    });
  };

  handleSaveEvent = () => {};

  handleBack = () => {};

  onHandleNext = () => {
    const { pages, handleChangeHeader, blocks, currentPage } = this.props;
    const { currentIndex } = this.state;
    let newPageId = '';

    if (currentIndex === pages.length - 1) {
      if (pages[currentIndex].child.length === 0) {
        newPageId = uuid();
        pages.push({
          id: newPageId,
          title: 'New Page',
          child: [],
        });
      } else {
        const index = pages[currentIndex].child.findIndex(
          (item) => item.id === currentPage
        );

        if (index === pages[currentIndex].child.length - 1) {
          newPageId = uuid();
          pages.push({
            id: newPageId,
            title: 'New Page',
            child: [],
          });
        } else {
          newPageId = pages[currentIndex].child[index + 1].id;
        }
      }
    } else {
      if (pages[currentIndex].child.length === 0) {
        newPageId = this.getNextId();
      } else newPageId = this.getNextIdChild();
    }
    handleChangeHeader(pages, newPageId, blocks);
  };

  render() {
    const { collapsed, editable, currentIndex } = this.state;
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
              <EditableHeader editable={editable} />

              <div className="d-flex">
                <p className="mr-2">Current page : </p>
                <NavigationMenu />
              </div>
            </div>
            <DropContainer match={match} editable={editable} />
          </div>
        </div>

        <div className="d-flex   flex-row-reverse mr-5 mb-5">
          <Button
            variant="info"
            className="mr-1 ml-1"
            onClick={this.onHandleNext}
          >
            Next
          </Button>

          <Button
            variant="secondary"
            className="mr-1 ml-1"
            onClick={this.handleBack}
            disabled={currentIndex === 0}
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
  pages: state.event.pages,
  currentPage: state.event.currentPage,
});

const mapDispatchToProps = (dispatch) => ({
  savePage: (route, innerHtml, editable) =>
    dispatch(eventActions.savePage(route, innerHtml, editable)),

  getCurrentUser: () => dispatch(userActions.getCurrentUser()),

  handleChangeHeader: (pages, currentPage, blocks) =>
    dispatch(eventActions.savePage(pages, currentPage, blocks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
