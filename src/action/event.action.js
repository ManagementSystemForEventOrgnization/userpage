import API from './axious.config';
import { eventConstants } from '../constants/index';
import history from '../utils/history';

const getEventDetail = (eventId) => {
  return (dispatch) => {
    API.get(`/api/event`, {
      params: {
        eventId,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(success(res.data.result));
        }
      })
      .catch((err) => {
        dispatch(failure('Something wrong !!!'));
      });
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
  let block = [];
  console.log(blocks[0]);

  blocks.map((item) => {
    let temp = { ...item };

    for (let key in item) {
      if (typeof item[key] === 'function') {
        temp[key] = `(${item[key]}).apply(null,[${item.id},${false}, ${
          item.style
        }])`;

        temp[key] = temp[key].replace(/\"/g, '\\"').replace(/\n/g, ' ');
      }
    }
    block.push(temp);
  });

  return (dispatch) => {
    dispatch(request());
    let block1 = block[0]['options'];
    console.log(block1);
    // console.log('start function block1');
    // eval(block1);

    API.post('/api/save/page_event', { block, eventId })
      .then((res) => {
        console.log('TCL Save event detail  THEN: ', res);

        if (res.status === 200) {
          dispatch(success());
          history.push(`/event/${eventId}`);
        }
      })
      .catch((err) => {
        console.log('TCL Save event detail  CATCH: ', err.response);

        const { data } = err.response;
        if (data.error) {
          dispatch(failure(data.error.message));
        }
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

const getCategories = () => {
  // /api/evenCategory
  return (dispatch) => {
    API.get(`/api/evenCategory`)
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

const prepareForCreateEvent = (
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
) => {
  return (dispatch) => {
    dispatch(request());
    API.post('api/save/event', {
      // { name, typeOfEvent, category, urlWeb, limitNumber, address, detailAddress, map, startTime, endTime, isSellTicket }
      name: nameEvent,
      typeOfEvent,
      category,
      urlWeb: webAddress,
      limitNumber: quantity,
      address: address,
      detailAddress: locationName,
      map: {
        long: map.lng,
        lat: map.lat,
      },
      startTime: time.fromString,
      endTime: time.toString,
      isSellTicket: isSellTicket === 'True' ? true : false,
    })
      .then((res) => {
        if (res.status === 200) {
          const id = res.data.result;
          setTimeout(
            dispatch(
              success(
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
              )
            ),
            5000
          );
          history.push('/create');
        }
      })
      .catch((err) => {
        const { data } = err.response;
        console.log(data.error.message);
        if (data.error) {
          setTimeout(dispatch(failure(data.error.message)), 5000);
        }
      });
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
};
