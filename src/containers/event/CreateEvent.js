import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import { Popover } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';

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
      loading: true,
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
    const { getEventInfo, webAddress } = this.props;
    const eventId = localStorage.getItem('webAddress');

    this.getCurrentIndex();
    if (!webAddress) {
      getEventInfo(eventId)
        .then((data) => {
          this.setState({
            loading: false,
          });
        })
        .catch((err) =>
          this.setState({
            loading: false,
          })
        );
    } else {
      this.setState({ loading: false });
    }
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

    window.scrollTo(0, 0);
  };

  handleSaveEvent = (isPreview) => {
    const {
      blocks,
      system,
      pages,
      saveEvent,
      headerStyle,
      webAddress,
    } = this.props;

    const header = [
      {
        pages,
        type: 'header',
        style: headerStyle,
      },
    ];

    saveEvent(
      webAddress || localStorage.getItem('webAddress'),
      [...system, blocks],
      header,
      isPreview
    )
      .then((data) => {
        window.open(
          `/event/${webAddress || localStorage.getItem('webAddress')}`,
          '_blank'
        );
      })
      .catch((err) => {});
  };

  getPreviousId = () => {
    const { pages } = this.props;
    const { currentIndex } = this.state;
    if (pages[currentIndex - 1].child.length === 0) {
      return pages[currentIndex - 1].id;
    } else {
      const length = pages[currentIndex - 1].child.length;
      return pages[currentIndex - 1].child[length - 1].id;
    }
  };

  getPreviousChildId = () => {
    const { pages, currentPage } = this.props;
    const { currentIndex } = this.state;

    const index = pages[currentIndex].child.findIndex(
      (item) => item.id === currentPage
    );
    if (index === 0) {
      return this.getPreviousId();
    }
    return pages[currentIndex].child[index - 1].id;
  };

  handleBack = () => {
    const { pages, handlePreviousPage } = this.props;
    const { currentIndex } = this.state;
    let newPageId = '';

    if (pages[currentIndex].child.length === 0) {
      newPageId = this.getPreviousId();
    } else {
      newPageId = this.getPreviousChildId();
    }

    handlePreviousPage(newPageId);
    window.scrollTo(0, 0);
  };

  isDisablePrevious = () => {
    const { currentIndex } = this.state;
    const { pages, currentPage } = this.props;

    if (currentIndex === 0) {
      if (pages[currentIndex].child.length === 0) {
        return true;
      } else {
        return pages[currentIndex].child[0].id === currentPage ? true : false;
      }
    }
    return false;
  };

  render() {
    const { collapsed, editable, loading } = this.state;
    const { match, pending } = this.props;

    const content = (
      <div className="p-3">
        Create event : Drag each block from menu to below container. <br />
        Menu for Event : Click edit icon to change each item of menu. <br />
        Next Page : Move to next page in Menu.
        <br />
        Previous Page : Move to previous page in Menu.
        <br />
        Public :Public this page event.
        <br />
        Preview : Preview this page event. <br />
      </div>
    );

    const inconStyle = {
      fontSize: ' 25px',
      color: '#ef0a0a',
      marginRight: '10px',
      marginTop: '5px',
    };
    const src =
      'https://res.cloudinary.com/eventinyourhand/image/upload/v1592392417/LoadingGif/Animation_that_matters_adding_value_to_your_interface_aektko.gif';

    return (
      <div className=" create-event">
        <div className="fixed-top ">
          <Header />
        </div>
        {loading ? (
          <div className="loading-gif d-flex justify-content-center">
            <img src={src} alt="loading" />
          </div>
        ) : (
          <div>
            <div className="d-flex flex-row-reverse">
              <Button
                className="mr-5 ml-1"
                variant="primary"
                onClick={() => this.handleSaveEvent(false)}
                disabled={pending}
              >
                Finish
              </Button>

              <Button
                className="mr-2 ml-2"
                variant="success"
                // onClick={() => this.handleSaveEvent(false)}
                disabled={pending}
              >
                Save Draft
              </Button>

              <Button
                variant="success"
                onClick={() => this.handleSaveEvent(true)}
              >
                Preview
              </Button>

              <Popover
                content={content}
                title="Help"
                trigger="click"
                placement="bottomLeft"
              >
                <QuestionCircleTwoTone style={inconStyle} />
              </Popover>
            </div>

            <div className="d-flex">
              <MenuBlockList toggleCollapsed={this.toggleCollapsed} />

              <div
                className={
                  collapsed
                    ? '  mt-1 drop-area  mb-5 move-right p-3 ml-auto'
                    : ' mt-1 drop-area  mb-5 p-3 ml-auto'
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
                Next Page
              </Button>

              <Button
                variant="secondary"
                className="mr-1 ml-1"
                onClick={this.handleBack}
                disabled={this.isDisablePrevious()}
              >
                Previous Page
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pending: state.event.pending,
  blocks: state.event.blocks,
  pages: state.event.pages,
  currentPage: state.event.currentPage,
  headerStyle: state.event.headerStyle,
  system: state.event.system,
  webAddress: state.event.webAddress,
});

const mapDispatchToProps = (dispatch) => ({
  savePage: (eventId, blocks, header, isPreview) =>
    dispatch(eventActions.savePage(eventId, blocks, header, isPreview)),

  getCurrentUser: () => dispatch(userActions.getCurrentUser()),

  handleChangeHeader: (pages, currentPage, blocks) =>
    dispatch(eventActions.savePage(pages, currentPage, blocks)),

  handlePreviousPage: (currentPage) =>
    dispatch(eventActions.getPreviousPage(currentPage)),

  saveEvent: (eventId, blocks, header, isPreview) =>
    dispatch(eventActions.saveEvent(eventId, blocks, header, isPreview)),

  getEventInfo: (eventId) => dispatch(eventActions.getEventInfo(eventId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
