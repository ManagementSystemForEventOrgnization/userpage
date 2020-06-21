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
const verifyEventMember = (joinUserId, eventId, sessionId) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      API.post('/api/verifyEventMember', {
        eventId,
        sessionId,
        joinUserId
      })
        .then((res) => {
          resolve('true');
          console.log(res.data.result);
        })
        .catch((err) => reject(err));
    });
  };
};

const rejectEventMember = (joinUserId, eventId, sessionId) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      API.post('/api/rejectEventMenber', {
        eventId,
        sessionId,
        joinUserId
      })
        .then((res) => {
          resolve('true');
          console.log(res.data.result);
        })
        .catch((err) => reject(err));
    });
  };
};

const reportUser = (userId, cause, eventId) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      API.post('/api/user/reported', {
        userId, cause, eventId
      })
        .then((res) => {
          resolve('true');
          console.log(res.data.result);
        })
        .catch((err) => reject(err));
    });
  };
};

export const applyEventActions = {
  applyEvent,
  cancelEvent,
  verifyEventMember,
  rejectEventMember,
  reportUser

};
