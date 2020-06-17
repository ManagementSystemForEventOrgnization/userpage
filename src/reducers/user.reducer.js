import { userConstants } from '../constants/index';

const initialState = {
  isLogined: localStorage.getItem('isLogined'),
  errMessage: null,
  pending: false,
  userInfo: null,
  active: null,
  showCheckCode: false,
  showVerifyForgotPassword: false,
  arrEvent: [],
  notifications: [],
  numUnreadNotification: 0,
  chatHistory: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        pending: true,
        errMessage: null,
        active: null,
      };

    case userConstants.LOGIN_SUCCESS:
      localStorage.setItem('isLogined', true);
      localStorage.setItem('username', action.user.fullName);
      localStorage.setItem('avatar', action.user.avatar);
      localStorage.setItem('userId', action.user._id);

      return {
        ...state,
        isLogined: action.user.isActive,
        pending: false,
        userInfo: action.user,
        errMessage: null,
        active: action.user.isActive,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        errMessage: action.error,
        isLogined: false,
        pending: false,
      };

    case userConstants.LOGIN_GOOGLE_SUCCESS:
      localStorage.setItem('isLogined', true);
      localStorage.setItem('username', action.user.fullName);
      localStorage.setItem('avatar', action.user.avatar);
      localStorage.setItem('userId', action.user._id);

      return {
        ...state,
        userInfo: action.user,
        isLogined: true,
        pending: false,
      };

    case userConstants.LOGIN_GOOGLE_FAILURE:
      return {
        ...state,
        userInfo: null,
        isLogined: false,
        pending: false,
        errMessage: action.error,
      };

    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        pending: true,
        errMessage: null,
      };

    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        pending: false,
        userInfo: action.user,
        active: false,
        showCheckCode: true,
      };
    case userConstants.REGISTER_FAILURE:
      return {
        ...state,
        errMessage: action.error,
        pending: false,
        showCheckCode: false,
      };
    case userConstants.CHECK_CODE_REQUEST:
      return {
        ...state,
        pending: true,
        errMessage: null,
      };
    case userConstants.CHECK_CODE_SUCCESS:
      localStorage.setItem('isLogined', true);
      localStorage.setItem('username', state.userInfo.fullName);
      localStorage.setItem('avatar', state.userInfo.avatar);
      localStorage.setItem('userId', state.userInfo._id);

      return {
        ...state,
        isLogined: true,
        pending: false,
        active: true,
      };
    case userConstants.CHECK_CODE_FAILURE:
      return {
        ...state,
        errMessage: action.error,
        pending: false,
        active: false,
      };

    case userConstants.LOGOUT:
      localStorage.removeItem('isLogined');
      localStorage.removeItem('username');
      localStorage.removeItem('avatar');
      localStorage.removeItem('userId');
      localStorage.removeItem('currentSocket');
      return {
        ...state,
        userInfo: null,
        isLogined: false,
        pending: false,
      };

    case userConstants.GET_CURRENT_USER_REQUEST:
      return {
        ...state,
        pending: true,
      };

    case userConstants.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.user,
        pending: false,
      };
    case userConstants.GET_CURRENT_USER_FAILURE:
      return {
        ...state,
        userInfo: null,
        pending: false,
      };

    case userConstants.GET_BANK_INFOR_REQUEST:
      return {
        ...state,
        pending: true,
      };

    case userConstants.GET_BANK_INFOR_SUCCESS:
      return {
        ...state,
        bankInfor: action.bankInfor || {},
        pending: false,
      };

    case userConstants.GET_BANK_INFOR_FAILURE:
      return {
        ...state,
        bankInfor: null,
        pending: false,
      };

    case userConstants.UPDATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case userConstants.UPDATE_USER_PROFILE_SUCESS:
      return {
        ...state,
        pending: false,
        userInfo: action.user,
      };
    case userConstants.UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        pending: false,
        errMessage: action.error,
      };
    case userConstants.SENDEMAILFORGOTPASSWORD_REQUEST:
      return {
        ...state,
        pending: true,
        errMessage: null,
      };

    case userConstants.SENDEMAILFORGOTPASSWORD_SUCCESS:
      return {
        ...state,
        pending: false,
        errMessage: null,
        showVerifyForgotPassword: true,
      };

    case userConstants.SENDEMAILFORGOTPASSWORD_FAILURE:
      return {
        ...state,
        pending: false,
        errMessage: action.error,
        showVerifyForgotPassword: false,
      };
    case userConstants.FORGOTPASSWORD_REQUEST:
      return {
        ...state,
        pending: true,
        errMessage: null,
      };
    case userConstants.FORGOTPASSWORD_SUCCESS:
      return {
        ...state,
        pending: false,
        errMessage: null,
      };

    case userConstants.FORGOTPASSWORD_FAILURE:
      return {
        ...state,
        pending: false,
        errMessage: action.error,
      };
    case userConstants.GET_HISTORY_REQUEST:
      return {
        ...state,
        pending: true,
        errMessage: null,
      };
    case userConstants.GET_HISTORY_SUCCESS:
      return {
        ...state,
        arrEvent: action.arrEvent,
        pending: false,
        errMessage: null,
      };

    case userConstants.GET_HISTORY_FAILURE:
      return {
        ...state,
        pending: true,
        errMessage: action.error,
      };
    case userConstants.GET_LIST_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: [...state.notifications, ...action.notifications],
        errMessage: null,
      };

    case userConstants.GET_LIST_NOTIFICATION_FAILURE:
      return {
        ...state,
        errMessage: action.error,
      };
    case userConstants.GET_HISTORY_CREATE_REQUEST:
      return {
        ...state,
        pending: true,
        errMessage: null,
      };
    case userConstants.GET_HISTORY_CREATE_SUCCESS:
      return {
        ...state,
        arrEvent: action.arrEvent,
        pending: false,
        errMessage: null,
      };

    case userConstants.GET_HISTORY_CREATE_FAILURE:
      return {
        ...state,
        pending: true,
        errMessage: action.error,
      };

    case userConstants.GET_UNREADNOTIFICATION:
      return {
        ...state,
        numUnreadNotification: action.numUnreadNotification,
      };

    case userConstants.SET_READ_NOTIFICATION:
      return {
        ...state,
        notifications: action.notifications,
      };

    case userConstants.DELETE_NOTIFICATION:
      return {
        ...state,
        notifications: action.notifications,
      };

    case userConstants.GET_CHAT_HISTORY:
      return {
        ...state,
        chatHistory: action.chatHistory,
      };

    default:
      return state;
  }
};

export default user;
