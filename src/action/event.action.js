import API from './axious.config';
import { eventConstants } from '../constants/index';
import history from '../utils/history';
import handleCatch from './middleware';

const getEventDetail = (eventId) => {
  return (dispatch) => {
    API.get(`/api/event`, {
      params: {
        eventId,
      },
    })
      .then((res) => {
        dispatch(success(res.data.result));
      })
      .catch((err) => handleCatch(dispatch, failure, err));
  };

  function success(page) {
    return {
      type: eventConstants.GET_EVENT_DETAIL_SUCCESS,
      page,
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

const saveEvent = (block, eventId, isPreview) => {
  return (dispatch) => {
    dispatch(request());
    API.post('/api/save/page_event', {
      block,
      eventId,
      isPreview,
    })
      .then((res) => {
        console.log('TCL Save event detail  THEN: ', res);
        dispatch(success());
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

const savePage = (route, blocks, editable) => {
  return (dispatch) => {
    dispatch(request(route, blocks, editable));
  };
  function request(route, innerHtml, editable) {
    // need to update
    return {
      type: eventConstants.SAVE_PAGE,
      route,
      innerHtml,
      editable,
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
  quantity,
  session,
  isSellTicket,
  webAddress
) => {
  return (dispatch) => {
    dispatch(request());
    API.post('api/save/event', {
      name: nameEvent,
      typeOfEvent,
      category,
      urlWeb: webAddress,
      limitNumber: quantity,
      session,
      isSellTicket: isSellTicket === 'True' ? true : false,
    })
      .then((res) => {
        const { _id } = res.data.result;
        dispatch(
          success(
            _id,
            nameEvent,
            typeOfEvent,
            category,
            quantity,
            session,
            isSellTicket,
            webAddress
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
};
