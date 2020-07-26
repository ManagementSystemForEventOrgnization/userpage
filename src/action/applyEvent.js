import API from './axious.config';

const applyEvent = (eventId, sessionIds, payType) => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };

  return (dispatch) => {
    return new Promise((resolve, reject) => {
      // dispatch(request());
      API.post(
        '/api/joinEvent',
        {
          eventId,
          sessionIds,
          payType,
        },
        {
          headers: configHeader,
        }
      )
        .then((res) => {
          if (payType !== 'CREDIT_CARD') {
            resolve(res.data.resultOrder);
          } else {
            resolve('true');
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

const cancelEvent = (eventId, sessionIds) => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      API.post(
        '/api/cancelEvent',
        {
          eventId,
          sessionIds,
        },
        {
          headers: configHeader,
        }
      )
        .then((res) => {
          resolve('true');
        })
        .catch((err) => reject(err));
    });
  };
};

const handleRePay = (eventId, payType, sessionIds, cb) => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };
  return (dispatch) => {
    API.post(
      '/api/prepayEvent',
      {
        eventId,
        sessionIds,
        payType,
      },
      {
        headers: configHeader,
      }
    )
      .then((res) => {
        cb(res.data.resultOrder, 1);
      })
      .catch((err) => {
        cb(err, 0);
      });
  };
};

const rejectEventMember = (joinUserId, eventId, sessionId) => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };

  return (dispatch) => {
    return new Promise((resolve, reject) => {
      API.post(
        '/api/rejectEventMenber',
        {
          eventId,
          sessionId,
          joinUserId,
        },
        {
          headers: configHeader,
        }
      )
        .then((res) => {
          resolve('true');
        })
        .catch((err) => reject(err));
    });
  };
};

const reportUser = (userId, cause, eventId) => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      API.post(
        '/api/user/reported',
        {
          userId,
          cause,
          eventId,
        },
        {
          headers: configHeader,
        }
      )
        .then((res) => {
          resolve('true');
        })
        .catch((err) => reject(err));
    });
  };
};

export const applyEventActions = {
  applyEvent,
  cancelEvent,
  handleRePay,
  rejectEventMember,
  reportUser,
};
