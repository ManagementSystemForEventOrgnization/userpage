import API from './axious.config';
import { eventConstants } from '../constants/index';
import history from '../utils/history';
import handleCatch from './middleware';

const getEventDetail = (eventId, index) => {
  return (dispatch) => {
    API.get(`/api/event`, {
      params: {
        eventId,
        index,
      },
    })
      .then((res) => {
        // console.log(res.data.result);
        const { rows, header } = res.data.result;

        dispatch(success(rows, header[0], index));
      })
      .catch((err) => handleCatch(dispatch, failure, err));
  };

  function success(page, header, index) {
    return {
      type: eventConstants.GET_EVENT_DETAIL_SUCCESS,
      page,
      header,
      index,
    };
  }

  function failure(err) {
    return {
      type: eventConstants.GET_EVENT_DETAIL_FAILURE,
      err,
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
  // /api/evenCategory`
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

const updatePage = (route, innerHtml, editable) => {
  return (dispatch) => {
    dispatch(request(route, innerHtml, editable));
  };
  function request(route, innerHtml, editable) {
    return {
      type: eventConstants.UPDATE_PAGE,
      route,
      innerHtml,
      editable,
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
      isSellTicket: isSellTicket === 'True' ? true : false,
      banner,
    })
      .then((res) => {
        const { _id } = res.data.result;
        localStorage.setItem('currentId', _id);
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
    _id,
    nameEvent,
    typeOfEvent,
    category,
    quantity,
    session,
    isSellTicket,
    webAddress
  ) {
    return {
      type: eventConstants.PREPARE_FOR_CREATE_EVENT_SUCCESS,
      _id,
      nameEvent,
      typeOfEvent,
      category,
      quantity,
      session,
      isSellTicket,
      webAddress,
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

const getListEvent = () => {
  //api/getListEvent
  return (dispatch) => {
    API.get(`/api/getListEvent`)
      .then((res) => {
        if (res.status === 200) {
          console.log('data:', res.data.result);
          dispatch(success(res.data.result));
        } else {
          dispatch(failure());
        }
      })
      .catch((error) => {
        dispatch(failure());
      });
  };

  function success(events) {
    return {
      type: eventConstants.GET_LIST_EVENT_SUCCESS,
      events,
    };
  }
  function failure() {
    return {
      type: eventConstants.GET_LIST_EVENT_FAILURE,
    };
  }
};

const getHomeData = () => {
  return (dispatch) =>
    Promise.all([API.get('/api/getListEvent'), API.get('/api/evenCategory')])
      .then(([events, categories]) => {
        dispatch(success(categories.data.result));
      })
      .catch((err1) => {
        console.log(err1.response);
      });
  function success(categories) {
    return {
      type: eventConstants.GET_CATEGORIES_SUCCESS,
      categories,
    };
  }
};

const saveEvent = (id, blocks, header, isPreview) => {
  const eventId = id || '5ece70ae695f320470fb4753';

  return (dispatch) => {
    dispatch(request());
    API.post('/api/save/page_event', { eventId, blocks, header, isPreview })
      .then((res) => {
        console.log('TCL Save event detail  THEN: ', res);
        dispatch(success());
        localStorage.removeItem('currentIndex');
        // if(!isPreview){
        //     history.push(`/event/${eventId}`)
        // }
      })
      .catch((err) => handleCatch(dispatch, failure, err));
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

export const eventActions = {
  prepareForCreateEvent,
  storeBlocksWhenCreateEvent,
  getCategories,
  duplicateBlock,
  deleteBlock,
  getEventDetail,
  saveEvent,
  getListEvent,
  savePage,
  updatePage,
  getEventEdit,
  getHomeData,
  getPreviousPage,
  storeHeaderStyle,
  changeCurrentPage,
};
