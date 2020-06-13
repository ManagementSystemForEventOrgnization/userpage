import { applyEventConstants } from 'constants/index';

const initialState = {
  pending: false,
  errMessage: '',
  applyEvent: [
    // {
    //     eventId: '',
    //     session: [
    //     ]
    // }
  ],
};

const applyEvent = (state = initialState, action) => {
  switch (action.type) {
    case applyEventConstants.APPLY_EVENT_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case applyEventConstants.APPLY_EVENT_REQUEST_FAILURE:
      return {
        ...state,
        pending: false,
        errMessage: action.err,
      };
    case applyEventConstants.APPLY_EVENT_REQUEST_SUCCESS:
      return {
        ...state,
        pending: false,
        applyEvent: state.applyEvent.push(action),
      };
  }
};

export default applyEvent;
