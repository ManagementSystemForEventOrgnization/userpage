import API from './axious.config';
import { userConstants } from '../constants/index';
import history from '../utils/history';
import handleCatch from './middleware';

const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

const login = (email, password) => {
  return (dispatch) => {
    dispatch(request());
    API.post(`/api/login`, {
      email,
      password,
    })
      .then((res) => {
        dispatch(success(res.data.result));
        if (res.data.result.isActive) {
          history.push('/');
        }
      })
      .catch((error) => handleCatch(dispatch, failure, error));
  };

  function request() {
    return { type: userConstants.LOGIN_REQUEST };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
};

const loginWithGoogle = (profile) => {
  return (dispatch) => {
    API.post(`/api/login-google`, {
      profile,
    })
      .then((res) => {
        dispatch(success(res.data.result));
        history.push('/');
      })
      .catch((err) => handleCatch(dispatch, failure, err));
  };
  function success(user) {
    return { type: userConstants.LOGIN_GOOGLE_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_GOOGLE_FAILURE, error };
  }
};

const requestForgotPassword = (email) => {
  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  return (dispatch) => {
    if (!regex.test(email)) {
      return dispatch(failure('Invalid email !'));
    } else {
      dispatch(request());

      API.post('/api/requestForgotPassword', {
        email,
      })
        .then((res) => {
          if (res.status === 200) {
            dispatch(success());
          } else {
            dispatch(
              failure(res.data.error.message || 'OOPs! something wrong')
            );
          }
        })
        .catch((error) => {
          const { data } = error.response;
          if (data.error) {
            return dispatch(
              failure(data.error.message) || 'OOPs! something wrong'
            );
          }
          return dispatch(failure(error) || 'OOPs! something wrong');
        });
    }
  };
  function request() {
    return { type: userConstants.SENDEMAILFORGOTPASSWORD_REQUEST };
  }
  function success() {
    return { type: userConstants.SENDEMAILFORGOTPASSWORD_SUCCESS };
  }
  function failure(error) {
    return { type: userConstants.SENDEMAILFORGOTPASSWORD_FAILURE, error };
  }
};

const forgotPassword = (email, otp, newPassword) => {
  ///forgotPassword
  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  return (dispatch) => {
    if (!regex.test(email)) {
      return dispatch(failure('Invalid email !'));
    } else if (newPassword.length < 3 || newPassword.length > 20) {
      return dispatch(failure('Password should be from 3 to 20 characters!'));
    } else if (newPassword.indexOf(' ') !== -1) {
      return dispatch(failure('Password should not have white space !'));
    } else {
      dispatch(request());
      API.post(`/api/forgotPassword`, {
        email,
        otp,
        newPassword,
      })
        .then((res) => {
          dispatch(success());
          history.push('/login');
        })
        .catch((error) => handleCatch(dispatch, failure, error));
    }
  };

  function request() {
    return { type: userConstants.FORGOTPASSWORD_REQUEST };
  }
  function success() {
    return { type: userConstants.FORGOTPASSWORD_SUCCESS };
  }
  function failure(error) {
    return { type: userConstants.FORGOTPASSWORD_FAILURE, error };
  }
};

const register = (email, password, fullName) => {
  return (dispatch) => {
    if (!regex.test(email)) {
      return dispatch(failure('Invalid email !'));
    } else if (password.length < 3 || password.length > 20) {
      return dispatch(failure('Password should be from 3 to 20 characters!'));
    } else if (password.indexOf(' ') !== -1) {
      return dispatch(failure('Password should not have white space !'));
    } else {
      dispatch(request());
      API.post(`/api/register`, {
        email,
        password,
        fullName,
      })
        .then((res) => {
          dispatch(success(res.data.result));
        })
        .catch((error) => handleCatch(dispatch, failure, error));
    }
  };

  function request() {
    return { type: userConstants.REGISTER_REQUEST };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
};

const checkCode = (token) => {
  return (dispatch) => {
    dispatch(request());
    API.post(`/api/verifyToken`, {
      token,
    })
      .then((res) => {
        dispatch(success());
        history.push('/');
      })
      .catch((error) => {
        handleCatch(dispatch, failure, error);
      });
  };
  function request() {
    return { type: userConstants.CHECK_CODE_REQUEST };
  }
  function success() {
    return { type: userConstants.CHECK_CODE_SUCCESS };
  }
  function failure(error) {
    return { type: userConstants.CHECK_CODE_FAILURE, error };
  }
};

const logout = () => {
  API.get(`/api/logout`);
  return (dispatch) => {
    dispatch(request());
    history.push('/');
  };

  function request() {
    return { type: userConstants.LOGOUT };
  }
};

const getCurrentUser = () => {
  return (dispatch) => {
    dispatch(request());
    API.get(`/api/current_user`)
      .then((res) => {
        dispatch(success(res.data.result));
      })
      .catch((error) => {
        handleCatch(dispatch, failure, error);
      });
  };

  function request() {
    return { type: userConstants.GET_CURRENT_USER_REQUEST };
  }
  function success(user) {
    return { type: userConstants.GET_CURRENT_USER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GET_CURRENT_USER_FAILURE, error };
  }
};

const onUpdateUserProfile = (userInfor) => {
  console.log(userInfor);
  return (dispatch) => {
    dispatch(request());
    API.post(`/api/user/updateInfo`, {
      ...userInfor
    })
      .then((res) => {
        dispatch(success(res.data.result));
      })
      .catch((error) => handleCatch(dispatch, failure, error));
  };

  function request() {
    return { type: userConstants.UPDATE_USER_PROFILE_REQUEST };
  }
  function success(user) {
    return { type: userConstants.UPDATE_USER_PROFILE_SUCESS, user };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_USER_PROFILE_FAILURE, error };
  }
};

const get_History = (
  categoryEventId,
  startDate,
  endDate,
  txtSearch,
  pageNumber,
  numberRecord
) => {
  return (dispatch) => {
    dispatch(request());
    let dataSent = {};
    if (categoryEventId !== ' ') {
      dataSent.categoryEventId = categoryEventId;
      dataSent.pageNumber = pageNumber;
    }
    console.log(startDate, endDate);
    if (startDate !== '' && endDate !== ' ') {
      dataSent.startDate = startDate;
      dataSent.endDate = endDate;
      dataSent.pageNumber = pageNumber;
    }
    console.log(startDate, endDate);
    if (txtSearch !== " ") {
      dataSent.txtSearch = txtSearch;
      dataSent.pageNumber = pageNumber;
    }


    API.get(`/api/user/history`, {
      params: dataSent

    })
      .then((res) => {
        console.log("THT:", res.data.result)
        dispatch(success(res.data.result));
      })
      .catch((error) => handleCatch(dispatch, failure, error));
  };
  function request() {
    return { type: userConstants.GET_HISTORY_REQUEST };
  }

  function success(arrEvent) {
    return { type: userConstants.GET_HISTORY_SUCCESS, arrEvent };
  }
  function failure(error) {
    return { type: userConstants.GET_HISTORY_FAILURE, error };
  }
};

const getCreateHistory = (
  categoryEventId,
  startDate,
  endDate,
  txtSearch,
  pageNumber,
  numberRecord
) => {
  return (dispatch) => {
    dispatch(request());
    let dataSent = {};
    if (categoryEventId !== ' ') {
      dataSent.categoryEventId = categoryEventId;
      dataSent.pageNumber = pageNumber;
    }
    console.log(startDate, endDate);
    if (startDate !== '' && endDate !== ' ') {
      dataSent.startDate = startDate;
      dataSent.endDate = endDate;
      dataSent.pageNumber = pageNumber;
    }
    console.log(startDate, endDate);
    if (txtSearch !== " ") {
      dataSent.txtSearch = txtSearch;
      dataSent.pageNumber = pageNumber;
    }


    API.get(`/api/user/historyCreate`, {
      params: dataSent

    })
      .then((res) => {
        console.log("THT:", res.data.result)
        dispatch(success(res.data.result));
      })
      .catch((error) => handleCatch(dispatch, failure, error));
  };
  function request() {
    return { type: userConstants.GET_HISTORY_REQUEST };
  }

  function success(arrEvent) {
    return { type: userConstants.GET_HISTORY_SUCCESS, arrEvent };
  }
  function failure(error) {
    return { type: userConstants.GET_HISTORY_FAILURE, error };
  }
};
const getListNotification = () => {
  return (dispatch) => {
    API.get('api/getListNotification')
      .then((res) => {
        console.log('TLC,', res.data.result);
        dispatch(success(res.data.result));
      })
      .catch((error) => {
        handleCatch(dispatch, failure, error);
      });
  };

  function success(notifications) {
    return { type: userConstants.GET_LIST_NOTIFICATION_SUCCESS, notifications };
  }
  function failure(error) {
    return { type: userConstants.GET_LIST_NOTIFICATION_FAILURE, error };
  }
};

export const userActions = {
  login,
  loginWithGoogle,
  register,
  checkCode,
  logout,
  getCurrentUser,
  onUpdateUserProfile,
  forgotPassword,
  requestForgotPassword,
  get_History,
  getListNotification,
  getCreateHistory
};
