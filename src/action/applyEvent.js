import API from 'config/axious.config';

const applyEvent = (eventId, sessionIds, payType) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      // dispatch(request());
      API.post('/api/joinEvent', {
        eventId,
        sessionIds,
        payType,
      })
        .then((res) => {
          if (payType !== 'CREDIT_CARD') {
            resolve(res.data.resultOrder);
          } else {
            resolve('true');
          }
        })
        .catch((err) => reject(err));
    });
  };
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

const handleRePay = (eventId, payType, sessionIds, cb) => {
  return (dispatch) => {
    API.post('/api/prepayEvent', {
      eventId,
      sessionIds,
      payType,
    })
      .then((res) => {
        cb(res.data, 1);
      })
      .catch((err) => {
        cb(err, 0);
      });
  };
};

const verifyEventMember = (joinUserId, eventId, sessionId) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      API.post('/api/verifyEventMember', {
        eventId,
        sessionId,
        joinUserId,
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
        joinUserId,
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
        userId,
        cause,
        eventId,
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
  handleRePay,
  verifyEventMember,
  rejectEventMember,
  reportUser,
};
