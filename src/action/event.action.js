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

const saveEvent = (eventId, blocks) => {
  let block = [...blocks];

  // blocks.map((item) => {
  //   let temp = { ...item };
  //   for (let key in item) {
  //     if (typeof item[key] === 'function') {
  //       temp[key] = `(${item[key]}).apply(null,[${item.id},${false}, ${
  //         item.style
  //       }])`;

  //       temp[key] = temp[key].replace(/\"/g, '\\"').replace(/\n/g, ' ');
  //     }
  //   }
  //   block.push(temp);
  // });

  //const block = [...blocks];

  return (dispatch) => {
    dispatch(request());

    API.post('/api/save/page_event', { block, eventId })
      .then((res) => {
        console.log('TCL Save event detail  THEN: ', res);

        dispatch(success());
        // history.push(`/event/${eventId}`);
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
  // /api/evenCategory
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

const storeHtml = (data) => {
  return (dispatch) => {
    dispatch(request(data));
  };
  function request(data) {
    return {
      type: eventConstants.SAVE_HTML_TEST,
      data,
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
        const id = res.data.result;
        setTimeout(
          dispatch(
            success(
              id,
              nameEvent,
              typeOfEvent,
              category,
              quantity,
              session,
              isSellTicket,
              webAddress
            )
          ),
          5000
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
    quantity,
    address,
    locationName,
    map,
    time,
    isSellTicket,
    webAddress
  ) {
    return {
      type: eventConstants.PREPARE_FOR_CREATE_EVENT_SUCCESS,
      id,
      nameEvent,
      typeOfEvent,
      category,
      quantity,
      address,
      locationName,
      map,
      time,
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

export const eventActions = {
  prepareForCreateEvent,
  storeBlocksWhenCreateEvent,
  getCategories,
  duplicateBlock,
  deleteBlock,
  getEventDetail,
  saveEvent,
  storeHtml,
};
