import API from 'config/axious.config';

const applyEvent = (eventId, sessionIds) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      // dispatch(request());
      API.post('/api/joinEvent', {
        eventId,
        sessionIds,
      })
        .then((res) => {
          // dispatch(success(res.data.result));
          resolve('true');
        })
        .catch((err) => reject(err));
    });
  };
  // function request() {
  //   return {
  //     type: applyEventConstants.APPLY_EVENT_REQUEST,
  //   };
  // }
  // function success(data) {
  //   return {
  //     type: applyEventConstants.APPLY_EVENT_REQUEST_FAILURE,
  //     data,
  //   };
  // }
  // function failure(err) {
  //   return {
  //     type: applyEventConstants.APPLY_EVENT_REQUEST_FAILURE,
  //     err,
  //   };
  // }
};

const cancelEvent = (eventId, sessionIds) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      API.post('/api/cancelEvent', {
        eventId,
        sessionIds,
      })
        .then((res) => {
          resolve('true');
        })
        .catch((err) => reject(err));
    });
  };
};

export const applyEventAction = {
  applyEvent,
  cancelEvent,
};
