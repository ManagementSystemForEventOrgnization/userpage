import { userConstants } from '../constants/index';

const initialState = {
  isLogined: false,
  errMessage: null,
  pending: false,
  userInfo: null,
  active: null,
  showCheckCode: false,
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
      return {
        ...state,
        isLogined: true,
        pending: false,
        active: true,
      };
    case userConstants.CHECK_CODE_FAILURE:
      console.log(action.error);
      return {
        ...state,
        errMessage: action.error,
        pending: false,
        active: false,
      };

    case userConstants.LOGOUT:
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
        isLogined: true,
        pending: false,
      };
    case userConstants.GET_CURRENT_USER_FAILURE:
      return {
        ...state,
        userInfo: null,
        isLogined: false,
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
    default:
      return state;
  }
};

export default user;
