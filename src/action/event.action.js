import { createBrowserHistory } from 'history';
import API from './axious.config';
import { eventConstants } from '../constants/index';

const history = createBrowserHistory();

const getCategories = () => {
  // /api/evenCategory
  return (dispatch) => {
    API.get(`/api/evenCategory`)
      .then((res) => {
        console.log(res);
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
    console.log(
      nameEvent,
      typeOfEvent,
      category,
      webAddress,
      quantity,
      address,
      locationName,
      map,
      time.fromString,
      time.toString,
      isSellTicket
    );
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
          setTimeout(
            dispatch(
              success(
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
};
