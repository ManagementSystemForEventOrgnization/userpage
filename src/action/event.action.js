import API from './axious.config';
import { eventConstants } from '../constants/index';
import history from '../utils/history';
import handleCatch from './middleware';
import axios from 'axios';

const getHomeData = () => {
  return (dispatch) =>
    Promise.all([
      API.get('/api/get_list_event_coming_up'),
      API.get('/api/evenCategory'),
    ])
      .then(([events, categories]) => {
        dispatch(success(events.data.result, categories.data.result));
      })
      .catch((error) => handleCatch(dispatch, failure, error));
  function success(events, categories) {
    return {
      type: eventConstants.GET_HOME_DATA_SUSSESS,
      events,
      categories,
    };
  }
  function failure() {
    return {
      type: eventConstants.GET_HOME_DATA_FAILURE,
    };
  }
};

const getEventDetail = (eventId, index, editSite) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(request());
      API.get(`/api/event`, {
        params: {
          eventId,
          index,
          editSite,
        },
      })
        .then((res) => {
          const { rows, header, event, eventId } = res.data.result;
          if (rows) {
            let blocks = !rows.length ? [] : rows;
            dispatch(success(blocks, header[0], index, event));
            resolve(eventId);
          } else reject();
        })
        .catch((err) => {
          handleCatch(dispatch, failure, err);
          reject();
        });
    });
  };

  function request() {
    return {
      type: eventConstants.GET_EVENT_DETAIL_REQUEST,
    };
  }

  function success(page, header, index, event) {
    return {
      type: eventConstants.GET_EVENT_DETAIL_SUCCESS,
      page,
      header,
      index,
      event,
    };
  }

  function failure(err) {
    return {
      type: eventConstants.GET_EVENT_DETAIL_FAILURE,
      err,
    };
  }
};

const getEventDetailEdit = (eventId, index, editSite) => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(request());
      API.get('/api/event_edit', {
        params: {
          eventId,
          index,
          editSite,
        },
        headers: configHeader,
      })
        .then((res) => {
          const { rows, header, event } = res.data.result;
          localStorage.setItem('currentIndex', index);
          localStorage.setItem('currentId', res.data.result.eventId);
          localStorage.setItem('webAddress', res.data.result.event.urlWeb);

          let blocks = !rows.length ? [] : rows;
          dispatch(success(blocks, header[0], index, event));
          resolve();
        })
        .catch((err) => {
          handleCatch(dispatch, failure, err);
          reject(err);
        });
    });
  };

  function request() {
    return {
      type: eventConstants.GET_EVENT_DETAIL_REQUEST,
    };
  }

  function success(page, header, index, event) {
    return {
      type: eventConstants.GET_EVENT_DETAIL_SUCCESS,
      page,
      header,
      index,
      event,
    };
  }

  function failure(err) {
    return {
      type: eventConstants.GET_EVENT_DETAIL_FAILURE,
      err,
    };
  }
};

const getCategories = () => {
  return (dispatch) => {
    API.get(`/api/evenCategory`)
      .then((res) => {
        dispatch(success(res.data.result));
      })
      .catch((error) => handleCatch(dispatch, failure, error));
  };

  function success(categories) {
    return {
      type: eventConstants.GET_CATEGORIES_SUCCESS,
      categories,
    };
  }
  function failure() {
    return {
      type: eventConstants.GET_CATEGORIES_FAILURE,
    };
  }
};

const savePage = (pages, currentPage, blocks) => {
  return (dispatch) => {
    dispatch(request(pages, currentPage, blocks));
  };
  function request(pages, currentPage, blocks) {
    return {
      type: eventConstants.SAVE_PAGE,
      pages,
      currentPage,
      blocks,
    };
  }
};

const getPreviousPage = (currentPage) => {
  return (dispatch) => {
    dispatch(request(currentPage));
  };
  function request(currentPage) {
    return {
      type: eventConstants.GET_PREVIOUS_PAGE,
      currentPage,
    };
  }
};

const changeCurrentPage = (id) => {
  return (dispatch) => {
    return dispatch(request(id));
  };

  function request(currentPage) {
    return {
      type: eventConstants.CHANGE_CURRENT_PAGE,
      currentPage,
    };
  }
};

const changePages = (pages, currentPage) => {
  return (dispatch) => {
    return dispatch(request(pages, currentPage));
  };

  function request(pages, currentPage) {
    return {
      type: eventConstants.CHANGE_PAGES,
      pages,
      currentPage,
    };
  }
};

const storeHeaderStyle = (style) => {
  return (dispatch) => {
    dispatch(request(style));
  };
  function request(headerStyle) {
    return {
      type: eventConstants.STORE_HEADER_STYLE,
      headerStyle,
    };
  }
};

const uploadFiles = (fileList) => {
  const files = new FormData();

  fileList.map((item) => files.append('file', item));
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: '/api/upload',
      data: files,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        resolve(res.data.result);
      })
      .catch((err) => {
        // console.log(err.response);
        reject(err);
      });
  });
};

const deleteUploadedFile = (url_del, cb) => {
  API.post('/api/delete_file', url_del)
    .then(() => {
      cb();
    })
    .catch((err) => {
      cb(err);
    });
};

const prepareForCreateEvent = (
  nameEvent,
  typeOfEvent,
  category,
  session,
  isSellTicket,
  webAddress,
  bannerUrl,
  ticket
) => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };

  return (dispatch) => {
    dispatch(request());
    const domain = process.env.REACT_APP_DOMAIN_EVENT_DEPLOY;

    API.post(
      '/api/save/event',
      {
        name: nameEvent,
        typeOfEvent,
        category,
        urlWeb: webAddress,
        session,
        isSellTicket: isSellTicket === 'Yes' ? true : false,
        bannerUrl,
        ticket,
        domain,
      },
      {
        headers: configHeader,
      }
    )
      .then((res) => {
        const { _id, urlWeb } = res.data.result;
        // console.log('TEST PREPARE : ', res.data.result);
        localStorage.setItem('currentId', _id);
        localStorage.setItem('webAddress', urlWeb);
        dispatch(
          success(
            _id,
            nameEvent,
            typeOfEvent,
            category,
            session,
            isSellTicket,
            webAddress,
            bannerUrl
          )
        );
        history.push('/create');
      })
      .catch((err) => handleCatch(dispatch, failure, err));
  };

  function request() {
    return {
      type: eventConstants.PREPARE_FOR_CREATE_EVENT,
    };
  }

  function success(
    id,
    nameEvent,
    typeOfEvent,
    category,
    session,
    isSellTicket,
    webAddress,
    banner
  ) {
    return {
      type: eventConstants.PREPARE_FOR_CREATE_EVENT_SUCCESS,
      id,
      nameEvent,
      typeOfEvent,
      category,
      session,
      isSellTicket,
      webAddress,
      banner,
    };
  }

  function failure(err) {
    return {
      type: eventConstants.PREPARE_FOR_CREATE_EVENT_FAILURE,
      err,
    };
  }
};

const updateEventInfo = (
  eventId,
  nameEvent,
  typeOfEvent,
  category,
  session,
  isSellTicket,
  webAddress,
  bannerUrl,
  ticket,
  cb
) => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };
  return (dispatch) => {
    dispatch(request());
    const domain = process.env.REACT_APP_DOMAIN_EVENT_DEPLOY;
    API.post(
      '/api/update/event',
      {
        eventId,
        name: nameEvent,
        typeOfEvent,
        category,
        urlWeb: webAddress,
        session,
        isSellTicket: isSellTicket === 'Yes' ? true : false,
        bannerUrl,
        ticket,
        domain,
      },
      {
        headers: configHeader,
      }
    )
      .then((res) => {
        const { _id } = res.data.result;

        dispatch(
          success(
            _id,
            nameEvent,
            typeOfEvent,
            category,
            session,
            isSellTicket,
            webAddress,
            bannerUrl
          )
        );
        cb();
      })
      .catch((err) => handleCatch(dispatch, failure, err));
  };

  function request() {
    return {
      type: eventConstants.UPDATE_EVENT_INFOR,
    };
  }

  function success(
    id,
    nameEvent,
    typeOfEvent,
    category,
    session,
    isSellTicket,
    webAddress,
    banner
  ) {
    return {
      type: eventConstants.UPDATE_EVENT_INFOR_SUCCESS,
      id,
      nameEvent,
      typeOfEvent,
      category,
      session,
      isSellTicket,
      webAddress,
      banner,
    };
  }

  function failure(err) {
    return {
      type: eventConstants.UPDATE_EVENT_INFOR_FAILURE,
      err,
    };
  }
};

const storeBlocksWhenCreateEvent = (blocks) => {
  return (dispatch) => {
    dispatch(request(blocks));
  };

  function request(blocks) {
    return { type: eventConstants.STORE_BLOCKS_WHEN_CREATE_EVENT, blocks };
  }
};

const duplicateBlock = (id) => {
  return (dispatch) => {
    dispatch(request(id));
  };
  function request(id) {
    return {
      type: eventConstants.DUPLICATE_BLOCK,
      id,
    };
  }
};

const deleteBlock = (id) => {
  return (dispatch) => {
    dispatch(request(id));
  };
  function request(id) {
    return {
      type: eventConstants.DELETE_BLOCK,
      id,
    };
  }
};

const getListEvent = (sentData) => {
  return (dispatch) => {
    dispatch(request());
    API.get(`/api/get_list_event`, { params: sentData })
      .then((res) => {
        if (res.status === 200) {
          dispatch(success(res.data.result.event));
        } else {
          dispatch(failure());
        }
      })
      .catch((error) => {
        dispatch(failure());
      });
  };
  function request() {
    return {
      type: eventConstants.GET_LIST_EVENT_REQUEST,
    };
  }
  function success(hlEvent) {
    return {
      type: eventConstants.GET_LIST_EVENT_SUCCESS,
      hlEvent,
    };
  }
  function failure() {
    return {
      type: eventConstants.GET_LIST_EVENT_FAILURE,
    };
  }
};

const getListEventUpComing = (pageNumber, numberRecord) => {
  let data = {
    numberRecord,
    pageNumber,
  };
  return (dispatch) => {
    API.get(`/api/get_list_event_coming_up`, {
      params: data,
    })
      .then((res) => {
        dispatch(success(res.data.result));
      })
      .catch((error) => handleCatch(dispatch, failure, error));
  };

  function success(events) {
    return {
      type: eventConstants.GET_LIST_EVENT_COMING_UP_SUCCESS,
      events,
    };
  }
  function failure() {
    return {
      type: eventConstants.GET_LIST_EVENT_COMING_UP_FAILURE,
    };
  }
};

const saveEvent = (id, blocks, header, isPreview) => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };
  const eventId = id || localStorage.getItem('webAddress');

  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(request());
      API.post(
        '/api/save/page_event',
        { eventId, blocks, header, isPreview },
        {
          headers: configHeader,
        }
      )
        .then((res) => {
          dispatch(success());
          localStorage.removeItem('currentIndex');
          localStorage.removeItem('editSite');

          if (!isPreview) {
            history.push(`/event/${eventId}`);
          } else {
            resolve('Save Successfully');
          }
        })
        .catch((err) => {
          handleCatch(dispatch, failure, err);
          reject(err);
        });
    });
  };
  function request() {
    return {
      type: eventConstants.SAVE_EVENT_DETAIL,
    };
  }
  function success() {
    return {
      type: eventConstants.SAVE_EVENT_DETAIL_SUCCESS,
    };
  }
  function failure(err) {
    return {
      type: eventConstants.SAVE_EVENT_DETAIL_FAILURE,
      err,
    };
  }
};

const getEventInfo = (urlWeb) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      API.get('/api/get_event_inf', {
        params: {
          urlWeb,
        },
      })
        .then((res) => {
          dispatch(
            request(res.data.result.event, res.data.result.countComment)
          );
          resolve(res.data.result.event);

          localStorage.setItem('currentId', res.data.result.event.eventId);
          localStorage.setItem('webAddress', res.data.result.event.urlWeb);
        })
        .catch((err) => {});
    });
  };

  function request(eventInfo, countComment) {
    return {
      type: eventConstants.GET_EVENT_INFO,
      eventInfo,
      countComment,
    };
  }
};

const getEventInfoUsingID = (eventId, cb) => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };

  return (dispatch) => {
    API.get('/api/get_event_info_app', {
      params: {
        eventId,
      },
      headers: configHeader,
    })
      .then((res) => {
        cb(res.data.result.event);
        dispatch(request(res.data.result.event, res.data.result.countComment));
      })
      .catch((err) => cb());
  };

  function request(eventInfo, countComment) {
    return {
      type: eventConstants.GET_EVENT_INFO,
      eventInfo,
      countComment,
    };
  }
};

const getComment = (eventId, pageNumber = 1, numberRecord) => {
  return (dispatch) => {
    API.get('/api/comment/get_list', {
      params: {
        eventId,
        pageNumber,
        numberRecord,
      },
    })
      .then((res) => {
        const { result } = res.data;
        dispatch(request(result));
      })
      .catch((err) => {});
  };

  function request(comments) {
    return {
      type: eventConstants.GET_COMMENT,
      comments,
      cmtPageNumber: pageNumber,
    };
  }
};

const saveComment = (eventId, content) => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };

  return (dispatch) => {
    dispatch(request());
    API.post(
      '/api/comment/save',
      {
        eventId,
        content,
      },
      {
        headers: configHeader,
      }
    )
      .then((res) => {
        const { result } = res.data;
        dispatch(success(result));
      })
      .catch((err) => {
        handleCatch(dispatch, failure, err);
      });
  };

  function request() {
    return {
      type: eventConstants.SAVE_COMMENT,
    };
  }
  function success(comment) {
    return {
      type: eventConstants.SAVE_COMMENT_SUCCESS,
      comment,
    };
  }

  function failure() {
    return {
      type: eventConstants.SAVE_COMMNET_FAILURE,
    };
  }
};

const getUserJoinEvent = (dataSent, callback) => {
  return (dispatch) => {
    API.get(`/api/get_user_join_event`, {
      params: dataSent,
    })
      .then((res) => {
        dispatch(success(res.data.result));
        callback(res.data.result);
      })
      .catch((error) => {
        handleCatch(dispatch, failure, error);
      });
  };

  function success(userJoinEvent) {
    return {
      type: eventConstants.GET_USER_JOIN_EVENT_SUCCESS,
      userJoinEvent,
    };
  }
  function failure() {
    return {
      type: eventConstants.GET_USER_JOIN_EVENT_FAILURE,
    };
  }
};

const cancelEvent = (eventId, sessionId) => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };
  let data = {};
  if (sessionId) {
    let sessionIds = [];
    sessionIds.push(sessionId);
    data = { eventId, sessionIds };
  } else {
    data = { eventId };
  }

  return (dispatch) => {
    dispatch(request());
    API.post(`/api/cancelEvent`, data, {
      headers: configHeader,
    })
      .then((res) => {
        dispatch(success(res.data.result));
      })
      .catch((error) => {
        handleCatch(dispatch, failure, error);
      });
  };
  function request() {
    return {
      type: eventConstants.CANCEL_EVENT_REQUEST,
    };
  }
  function success(cancelEvent) {
    return {
      type: eventConstants.CANCEL_EVENT_SUCCESS,
      cancelEvent,
    };
  }
  function failure(error) {
    return {
      type: eventConstants.CANCEL_EVENT_FAILURE,
      error,
    };
  }
};

export const eventActions = {
  storeBlocksWhenCreateEvent,
  getCategories,
  duplicateBlock,
  deleteBlock,
  storeHeaderStyle,
  changePages,
  getUserJoinEvent,
  prepareForCreateEvent,

  uploadFiles,
  deleteUploadedFile,

  getEventDetail,
  getListEventUpComing,
  getEventInfo,
  getEventInfoUsingID,
  getEventDetailEdit,

  saveEvent,
  savePage,

  getPreviousPage,
  getListEvent,
  getHomeData,

  getComment,
  saveComment,

  cancelEvent,

  changeCurrentPage,
  updateEventInfo,
};
