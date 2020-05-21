import API from 'config/axious.config';
import { applyEventConstants } from 'constants/index';
import handleCatch from './middleware';

const applyEvent = (eventId, session) => {
  return (dispatch) => {
    dispatch(request());
    API.post('/api/apply-event', {
      eventId,
      session,
    })
      .then((res) => {
        console.log('TCL Save event detail  THEN: ', res);
        dispatch(success(res.data.result));
      })
      .catch((err) => handleCatch(dispatch, failure, err));
  };
  function request() {
    return {
      type: applyEventConstants.APPLY_EVENT_REQUEST,
    };
  }
  function success(data) {
    return {
      type: applyEventConstants.APPLY_EVENT_REQUEST_FAILURE,
      data,
    };
  }
  function failure(err) {
    return {
      type: applyEventConstants.APPLY_EVENT_REQUEST_FAILURE,
      err,
    };
  }
};

export const applyEventAction = {
  applyEvent,
};
