import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import { Popover, message } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';

import { eventActions } from 'action/event.action';
import { userActions } from 'action/user.action';
import history from 'utils/history';

import DropContainer from '../templates/DropContainer';
import MenuBlockList from '../MenuBlockList';
import NavigationMenu from '../NavigationMenu';
import EditableHeader from '../Header';

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
    const { getEventInfo, getEventDetailEdit } = this.props;
    const urlWeb = localStorage.getItem('webAddress');
    const editSite = localStorage.getItem('editSite');
    //getEventDetail

    if (editSite && urlWeb) {
      getEventDetailEdit(urlWeb, 0, true)
        .then(() => {
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
      if (urlWeb) {
        getEventInfo(urlWeb)
          .then(() => {
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
        history.push('/');
      }
    }
    window.scrollTo(0, 0);
  };

  componentWillUnmount = () => {
    localStorage.removeItem('editSite');
    localStorage.removeItem('currentIndex');
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

  scrollTop = () => {
    const root = document.querySelector('#root');
    root.scrollTop = 0;
  };

  onHandleNext = () => {
    const { pages, handleChangeHeader, blocks, currentPage } = this.props;
    const { currentIndex } = this.state;
    let newPageId = '';
    this.scrollTop();

    this.setState({
      loading: true,
    });

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

    this.setState({
      loading: false,
    });
  };

  error = (msg) => {
    message.error({
      content: 'OPPs! Something is wrong !',
      style: {
        marginTop: '20vh',
        fontSize: '16px',
        fontWeight: 'bold',
      },
    });
  };

  success = (msg) => {
    message.success({
      content: 'Save success',
      style: {
        marginTop: '20vh',
        fontSize: '16px',
        fontWeight: 'bold',
      },
    });
  };

  handleSaveEvent = (isPreview, redirect) => {
    const {
      blocks,
      system,
      pages,
      saveEvent,
      headerStyle,
      webAddress,
      currentIndex,
    } = this.props;

    const header = [
      {
        pages,
        type: 'header',
        style: headerStyle,
      },
    ];

    const editSite = localStorage.getItem('editSite');
    const newBlockList = editSite
      ? [
          ...system.slice(0, currentIndex),
          blocks,
          ...system.slice(currentIndex + 1, system.length),
        ]
      : [...system, blocks];

    // new block list ?

    saveEvent(
      webAddress || localStorage.getItem('webAddress'),
      // [...system, blocks],
      newBlockList,
      header,
      isPreview
    )
      .then((data) => {
        if (redirect) {
          window.open(
            `/event/${webAddress || localStorage.getItem('webAddress')}`,
            '_blank'
          );
        } else {
          this.success();
        }
      })
      .catch((err) => {
        this.error();
      });
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
    const { pages, handlePreviousPage, blocks } = this.props;
    const { currentIndex } = this.state;
    let newPageId = '';

    this.scrollTop();

    if (pages[currentIndex].child.length === 0) {
      newPageId = this.getPreviousId();
    } else {
      newPageId = this.getPreviousChildId();
    }
    handlePreviousPage(newPageId, blocks);
    // handleChangeHeader(pages, currentPage, blocks);
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
        <b>Create event </b>: Drag each block from menu to below container.{' '}
        <br />
        <b> Menu for Event </b> : Click edit icon to change each item of menu.{' '}
        <br />
        <b> Next Page </b> : Move to next page in Menu.
        <br />
        <b>Previous Page </b> : Move to previous page in Menu.
        <br />
        <b>Public </b> :Public this page event.
        <br />
        <b>Preview </b> : Preview this page event. <br />
      </div>
    );

    const inconStyle = {
      fontSize: ' 25px',
      color: '#ef0a0a',
      marginRight: '10px',
      marginTop: '5px',
    };
    const src =
      'https://res.cloudinary.com/eventinyourhand/image/upload/v1592767111/LoadingGif/butlerm_darri3.gif';

    return (
      <div className=" create-event">
        {loading ? (
          <div className="loading-gif d-flex justify-content-center">
            <img src={src} alt="loading" style={{ width: '60%' }} />
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
                Request Publish
              </Button>

              <Button
                className="mr-2 ml-2"
                variant="success"
                onClick={() => this.handleSaveEvent(true)}
                disabled={pending}
              >
                Save Draft
              </Button>

              <Button
                variant="success"
                onClick={() => this.handleSaveEvent(true, true)}
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
  getCurrentUser: () => dispatch(userActions.getCurrentUser()),

  handleChangeHeader: (pages, currentPage, blocks) =>
    dispatch(eventActions.savePage(pages, currentPage, blocks)),

  handlePreviousPage: (currentPage, blocks) =>
    dispatch(eventActions.getPreviousPage(currentPage, blocks)),

  saveEvent: (eventId, blocks, header, isPreview) =>
    dispatch(eventActions.saveEvent(eventId, blocks, header, isPreview)),

  getEventInfo: (eventId) => dispatch(eventActions.getEventInfo(eventId)),
  getEventDetail: (eventId, index, editSite) =>
    dispatch(eventActions.getEventDetail(eventId, index, editSite)),
  getEventDetailEdit: (eventId, index, editSite) =>
    dispatch(eventActions.getEventDetailEdit(eventId, index, editSite)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
