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
          if (history.action === 'PUSH') {
            history.goBack();
          } else history.push('/');
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
        if (history.action === 'PUSH') {
          history.goBack();
        } else history.push('/');
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
    API.get(`/api/verifyToken`, {
      params: {
        token,
      },
    })
      .then((res) => {
        dispatch(success());
        if (history.action === 'PUSH') {
          history.goBack();
        } else history.push('/');

        // history.push('/');
      })
      .catch((error) => {
        console.log(error);
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
  return (dispatch) => {
    dispatch(request());
    API.post(`/api/user/updateInfo`, {
      ...userInfor,
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

const getBankAccount = () => {
  return (dispatch) => {
    dispatch(request());
    API.get(`/api/user/bank_inf`)
      .then((res) => {
        dispatch(success(res.data.result.bank));
      })
      .catch((error) => {
        handleCatch(dispatch, failure, error);
      });
  };

  function request() {
    return { type: userConstants.GET_BANK_INFOR_REQUEST };
  }
  function success(bankInfor) {
    return { type: userConstants.GET_BANK_INFOR_SUCCESS, bankInfor };
  }
  function failure(error) {
    return { type: userConstants.GET_BANK_INFOR_FAILURE, error };
  }
};

const onUpdateBankInfor = (bankInfor) => {
  return (dispatch) => {
    dispatch(request());
    API.post(`/api/user/update_bank_inf`, {
      ...bankInfor,
    })
      .then((res) => {
        dispatch(success(res.data.result));
      })
      .catch((error) => handleCatch(dispatch, failure, error));
  };

  function request() {
    return { type: userConstants.UPDATE_BANK_INFOR_REQUEST };
  }
  function success(success) {
    return { type: userConstants.UPDATE_BANK_INFOR_SUCESS, success };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_BANK_INFOR_FAILURE, error };
  }
};

const get_History = (dataSent) => {
  return (dispatch) => {
    dispatch(request());

    API.get(`/api/user/get_history_take_part_in`, {
      params: dataSent,
    })
      .then((res) => {
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

const getCreateHistory = (dataSent) => {
  return (dispatch) => {
    dispatch(request());
    API.get(`/api/user/historyCreate`, {
      params: dataSent,
    })
      .then((res) => {
        dispatch(success(res.data.result));
      })
      .catch((error) => handleCatch(dispatch, failure, error));
  };
  function request() {
    return { type: userConstants.GET_HISTORY_CREATE_REQUEST };
  }

  function success(arrEvent) {
    return { type: userConstants.GET_HISTORY_CREATE_SUCCESS, arrEvent };
  }
  function failure(error) {
    return { type: userConstants.GET_HISTORY_CREATE_FAILURE, error };
  }
};

const getListNotification = (pageNumber, numberRecord) => {
  return (dispatch) => {
    API.get('api/getListNotification', {
      params: {
        pageNumber,
        numberRecord,
      },
    })
      .then((res) => {
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

const getNumUnreadNotification = () => {
  return (dispatch) => {
    API.get('api/getBadgeNumber')
      .then((res) => {
        const { result } = res.data;
        dispatch(success(result));
      })
      .catch((err) => {});
  };

  function success(numUnreadNotification) {
    return {
      type: userConstants.GET_UNREADNOTIFICATION,
      numUnreadNotification,
    };
  }
};

const setReadNotification = (notificationId, notifications) => {
  return (dispatch) => {
    API.post('/api/setReadNotification', { notificationId }).then((res) => {
      const index = notifications.findIndex(
        (item) => item._id === notificationId
      );
      console.log(notifications);
      const newNoties = [
        ...notifications.slice(0, index),
        {
          ...notifications[index],
          isRead: true,
        },
        ...notifications.slice(index + 1, notifications.length),
      ];
      console.log(newNoties);
      dispatch(success(newNoties));
    });
  };

  function success(notifications) {
    return {
      type: userConstants.SET_READ_NOTIFICATION,
      notifications,
    };
  }
};

const setDeleteNotification = (notificationId, notifications) => {
  return (dispatch) => {
    API.post('/api/setDeleteNotification', {
      notificationId,
    }).then((res) => {
      const index = notifications.findIndex(
        (item) => item._id === notificationId
      );
      if (index !== -1) {
        const newNoties = [
          ...notifications.slice(0, index),
          ...notifications.slice(index + 1, notifications.length),
        ];

        dispatch(success(newNoties));
      }
    });
  };

  function success(notifications) {
    return {
      type: userConstants.DELETE_NOTIFICATION,
      notifications,
    };
  }
};

const getChatHistory = (sender) => {
  return (dispatch) => {
    API.get('api/chat/get_list', {
      params: {
        sender,
      },
    }).then((res) => {
      dispatch(success(res.data.result));
    });
  };

  function success(chatHistory) {
    return {
      type: userConstants.GET_CHAT_HISTORY,
      chatHistory,
    };
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
  getBankAccount,
  onUpdateBankInfor,
  getCreateHistory,
  getNumUnreadNotification,
  getChatHistory,
  setReadNotification,
  setDeleteNotification,
};
