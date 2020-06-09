import API from './axious.config';
import { eventConstants } from '../constants/index';
import history from '../utils/history';
import handleCatch from './middleware';

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

const getEventDetail = (eventId, index) => {
  return (dispatch) => {
    dispatch(request());
    API.get(`/api/event`, {
      params: {
        eventId,
        index,
      },
    })
      .then((res) => {
        const { rows, header, event } = res.data.result;
        localStorage.setItem('currentIndex', index);
        localStorage.setItem('currentId', res.data.result.eventId);
        dispatch(success(rows, header[0], index, event));
      })
      .catch((err) => handleCatch(dispatch, failure, err));
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

const getEventEdit = (eventId, route) => {
  return (dispatch) => {
    API.get(`/api/getPageEventEdit`, {
      params: {
        eventId,
        route,
      },
    })
      .then((res) => {
        dispatch(success(res.data.result[0].rows));
      })
      .catch((err) => handleCatch(dispatch, failure, err));
  };

  function success(page) {
    return {
      type: eventConstants.GET_EVENT_EDIT,
      page,
    };
  }

  function failure(err) {
    return {
      type: eventConstants.GET_EVENT_EDIT_FAILURE,
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

const prepareForCreateEvent = (
  nameEvent,
  typeOfEvent,
  category,
  session,
  isSellTicket,
  webAddress,
  banner
) => {
  return (dispatch) => {
    dispatch(request());
    API.post('api/save/event', {
      name: nameEvent,
      typeOfEvent,
      category,
      urlWeb: webAddress,
      session,
      isSellTicket: isSellTicket === 'Yes' ? true : false,
      banner,
    })
      .then((res) => {
        const { _id, urlWeb } = res.data.result;
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
            banner
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

const getListEvent = (categoryEventId, type) => {
  //api/getListEvent
  let sentData = {};
  console.log('categoryEventId', categoryEventId);
  if (categoryEventId) {
    sentData.categoryEventId = categoryEventId;
  }
  if (type) {
    sentData.type = type;
  }
  return (dispatch) => {
    API.get(`/api/get_list_event`, { params: sentData })
      .then((res) => {
        if (res.status === 200) {
          dispatch(success(res.data.result));
        } else {
          dispatch(failure());
        }
      })
      .catch((error) => {
        dispatch(failure());
      });
  };

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
  const eventId = id || localStorage.getItem('webAddress');

  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(request());
      API.post('/api/save/page_event', { eventId, blocks, header, isPreview })
        .then((res) => {
          dispatch(success());
          localStorage.removeItem('currentIndex');
          if (!isPreview) {
            history.push(`/event/${eventId}`);
            reject('err');
          }
          resolve('true');
        })
        .catch((err) => handleCatch(dispatch, failure, err));
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
          const { event, countComment } = res.data.result;
          dispatch(request(event, countComment));
          localStorage.setItem('currentId', event._id);

          resolve('true');
        })
        .catch((err) => {
          reject(err);
        });
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

export const eventActions = {
  storeBlocksWhenCreateEvent,
  getCategories,
  duplicateBlock,
  deleteBlock,
  storeHeaderStyle,

  prepareForCreateEvent,
  getEventDetail,
  getListEventUpComing,
  getEventEdit,
  getEventInfo,

  saveEvent,
  savePage,
  getPreviousPage,
  changeCurrentPage,
  changePages,
  getListEvent,
  getHomeData,
};
