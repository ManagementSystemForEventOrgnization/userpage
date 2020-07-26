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
        const webAddress = localStorage.getItem('webAddress');
        if (res.data.result.isActive) {
          if (history.action === 'PUSH' && webAddress) {
            // history.goBack();
            history.push(`event/${webAddress}`);
          } else history.push('/');
        }
      })
      .catch((error) => {
        handleCatch(dispatch, failure, error);
      });
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
        const webAddress = localStorage.getItem('webAddress');
        dispatch(success(res.data.result));
        if (history.action === 'PUSH' && webAddress) {
          // history.goBack();
          history.push(`event/${webAddress}`);
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
          dispatch(success());
        })
        .catch((error) => {
          handleCatch(dispatch, failure, error);
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
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };

  return (dispatch) => {
    dispatch(request());
    API.get(`/api/verifyToken`, {
      params: {
        token,
      },
      headers: configHeader,
    })
      .then((res) => {
        dispatch(success());
        const webAddress = localStorage.getItem('webAddress');
        if (history.action === 'PUSH' && webAddress) {
          // history.goBack();
          history.push(`/event/${webAddress}`);
        } else history.push('/');
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
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };

  API.get(`/api/logout`, {
    headers: configHeader,
  });
  return (dispatch) => {
    dispatch(request());
    history.push('/');
  };

  function request() {
    return { type: userConstants.LOGOUT };
  }
};

const getCurrentUser = () => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };
  return (dispatch) => {
    dispatch(request());
    API.get(`/api/current_user`, {
      headers: configHeader,
    })
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
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };
  return (dispatch) => {
    dispatch(request());
    API.post(`/api/user/updateInfo`, {
      ...userInfor,
      headers: configHeader,
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
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };
  return (dispatch) => {
    dispatch(request());
    API.get(`/api/user/bank_inf`, {
      headers: configHeader,
    })
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
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };
  return (dispatch) => {
    dispatch(request());
    API.post(`/api/user/update_bank_inf`, {
      ...bankInfor,
      headers: configHeader,
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

const onChangePassword = (passwords) => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };
  return (dispatch) => {
    dispatch(request());
    API.post(
      `/api/updatePassword`,
      {
        ...passwords,
      },
      {
        headers: configHeader,
      }
    )
      .then((res) => {
        dispatch(success(res.data.result));
      })
      .catch((error) => handleCatch(dispatch, failure, error));
  };

  function request() {
    return { type: userConstants.CHANGEPASSWORD_REQUEST };
  }
  function success(success) {
    return { type: userConstants.CHANGEPASSWORD_SUCCESS, success };
  }
  function failure(error) {
    return { type: userConstants.CHECK_CODE_FAILURE, error };
  }
};

const addPaymentCard = (cardToken) => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };
  return (dispatch) => {
    dispatch(request());
    API.post(
      `/api/add_card`,
      {
        cardToken,
      },
      {
        headers: configHeader,
      }
    )
      .then((res) => {
        dispatch(success(res.data.result));
      })
      .catch((error) => handleCatch(dispatch, failure, error));
  };

  function request() {
    return { type: userConstants.ADD_PAYMENT_CARD_REQUEST };
  }
  function success(success) {
    return { type: userConstants.ADD_PAYMENT_CARD_SUCCESS, success };
  }
  function failure(error) {
    return { type: userConstants.ADD_PAYMENT_CARD_FAILURE, error };
  }
};

const getListCardPayment = () => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };
  return (dispatch) => {
    dispatch(request());
    API.get(`/api/get_listcard`, {
      headers: configHeader,
    })
      .then((res) => {
        // console.log(res.data);
        dispatch(success(res.data.result));
      })
      .catch((error) => {
        handleCatch(dispatch, failure, error);
      });
  };

  function request() {
    return { type: userConstants.GET_LISTCARD_REQUEST };
  }
  function success(listCard) {
    return { type: userConstants.GET_LISTCARD_SUCCESS, listCard };
  }
  function failure(error) {
    return { type: userConstants.GET_LISTCARD_FAILURE, error };
  }
};

const postCardDefault = (cardId, callBack) => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };
  return (dispatch) => {
    dispatch(request());
    API.post(
      `/api/set_card_default`,
      {
        cardId,
      },
      {
        headers: configHeader,
      }
    )
      .then((res) => {
        callBack();
        dispatch(success(res.data.result));
      })
      .catch((error) => {
        callBack(error);
        handleCatch(dispatch, failure, error);
      });
  };

  function request() {
    return { type: userConstants.POST_CARDDEFAULT_REQUEST };
  }
  function success(success) {
    return { type: userConstants.POST_CARDDEFAULT_SUCCESS, success };
  }
  function failure(error) {
    return { type: userConstants.POST_CARDDEFAULT_FAILURE, error };
  }
};

const delCardDefault = (cardId, callBack) => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };
  return (dispatch) => {
    dispatch(request());
    API.post(
      `/api/del_card`,
      {
        cardId,
      },
      {
        headers: configHeader,
      }
    )
      .then((res) => {
        callBack();
        dispatch(success(res.data.result, cardId));
      })
      .catch((error) => {
        callBack(error);
        handleCatch(dispatch, failure, error);
      });
  };

  function request() {
    return { type: userConstants.DEL_CARDDEFAULT_REQUEST };
  }
  function success(success, cardId) {
    return { type: userConstants.DEL_CARDDEFAULT_SUCCESS, success, cardId };
  }
  function failure(error) {
    return { type: userConstants.DEL_CARDDEFAULT_FAILURE, error };
  }
};

const getHistoryPayment = (numberRecord = 16) => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };
  return (dispatch) => {
    dispatch(request());
    API.get(`/api/payment_history/`, {
      params: {
        numberRecord,
      },
      headers: configHeader,
    })
      .then((res) => {
        dispatch(success(res.data.result));
      })
      .catch((error) => {
        handleCatch(dispatch, failure, error);
      });
  };

  function request() {
    return { type: userConstants.GET_HISTORYPAYMENT_REQUEST };
  }
  function success(historyPayment) {
    return { type: userConstants.GET_HISTORYPAYMENT_SUCCESS, historyPayment };
  }
  function failure(error) {
    return { type: userConstants.GET_HISTORYPAYMENT_FAILURE, error };
  }
};

const get_History = (dataSent) => {
  const accessToken = localStorage.getItem('accessToken');

  return (dispatch) => {
    dispatch(request());

    API.get(`/api/user/get_history_take_part_in`, {
      params: dataSent,
      headers: {
        Authorization: accessToken,
      },
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
  const accessToken = localStorage.getItem('accessToken');

  return (dispatch) => {
    dispatch(request());
    API.get(`/api/user/historyCreate`, {
      params: dataSent,
      headers: {
        Authorization: accessToken,
      },
    })
      .then((res) => {
        dispatch(success(res.data.result, dataSent));
      })
      .then()
      .catch((error) => handleCatch(dispatch, failure, error));
  };
  function request() {
    return { type: userConstants.GET_HISTORY_CREATE_REQUEST };
  }

  function success(arrEvent, dataSent) {
    return { type: userConstants.GET_HISTORY_CREATE_SUCCESS, arrEvent, dataSent };
  }
  function failure(error) {
    return { type: userConstants.GET_HISTORY_CREATE_FAILURE, error };
  }
};

const getListNotification = (pageNumber = 1, numberRecord) => {
  const accessToken = localStorage.getItem('accessToken');

  return (dispatch) => {
    dispatch(request());
    API.get('/api/getListNotification', {
      params: {
        pageNumber,
        numberRecord,
      },
      headers: {
        Authorization: accessToken,
      },
    })
      .then((res) => {
        dispatch(success(res.data.result, pageNumber));
      })
      .catch((error) => {
        handleCatch(dispatch, failure, error);
      });
  };

  function request() {
    return { type: userConstants.GET_LIST_NOTIFICATION_REQUEST };
  }
  function success(notifications, pageNumber) {
    return {
      type: userConstants.GET_LIST_NOTIFICATION_SUCCESS,
      notifications,
      notiPageNumber: pageNumber,
    };
  }
  function failure(error) {
    return { type: userConstants.GET_LIST_NOTIFICATION_FAILURE, error };
  }
};
// chỗ nào call api anyf
const getNumUnreadNotification = () => {
  const accessToken = localStorage.getItem('accessToken');
  return (dispatch) => {
    API.get('/api/getBadgeNumber', {
      headers: {
        Authorization: accessToken,
      },
    })
      .then((res) => {
        const { result } = res.data;
        dispatch(success(result));
      })
      .catch((error) => {
        handleCatch(dispatch, failure, error);
      });
  };

  function success(numUnreadNotification) {
    return {
      type: userConstants.GET_UNREADNOTIFICATION,
      numUnreadNotification,
    };
  }

  function failure(err) {
    return {
      type: userConstants.GET_UNREADNOTIFICATION_FAILURE,
      err,
    };
  }
};

const setReadNotification = (notificationId) => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };
  return (dispatch) => {
    API.post(
      '/api/setReadNotification',
      {
        notificationId,
      },
      {
        headers: configHeader,
      }
    ).then((res) => {
      dispatch(success());
    });
  };

  function success() {
    return {
      type: userConstants.SET_READ_NOTIFICATION,
    };
  }
};

const setDeleteNotification = (notificationId) => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };

  return (dispatch) => {
    API.post(
      '/api/setDeleteNotification',
      {
        notificationId,
      },
      {
        headers: configHeader,
      }
    ).then((res) => {
      dispatch(success(notificationId));
    });
  };

  function success(notificationId) {
    return {
      type: userConstants.DELETE_NOTIFICATION,
      delNotificationId: notificationId,
    };
  }
};

const getChatHistory = (sender) => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };
  return (dispatch) => {
    API.get('/api/chat/get_list', {
      params: {
        sender,
      },
      headers: configHeader,
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

const deleteEvent = (eventId) => {
  const accessToken = localStorage.getItem('accessToken');
  const configHeader = {
    Authorization: accessToken,
  };

  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(request());
      API.post(
        `/api/delete/event`,
        {
          eventId,
        },
        {
          headers: configHeader,
        }
      )
        .then((res) => {
          dispatch(success(res.data.result, eventId));
          resolve(res.data.result);
        })
        .catch((error) => {
          handleCatch(dispatch, failure, error);
          reject(error);
        });
    });
  };
  function request() {
    return {
      type: userConstants.DELETE_EVENT_REQUEST,
    };
  }
  function success(deEvent, eventId) {
    return {
      type: userConstants.DELETE_EVENT_SUCCESS,
      deEvent,
      eventId,
    };
  }
  function failure(error) {
    return {
      type: userConstants.DELETE_EVENT_FAILURE,
      error,
    };
  }
};

const getListPaymentSession = (dataSent) => {
  const accessToken = localStorage.getItem('accessToken');

  return (dispatch) => {
    dispatch(request());
    API.get(`/api/user/list_payment_session`, {
      params: dataSent,
      headers: {
        Authorization: accessToken,
      },
    })
      .then((res) => {
        dispatch(success(res.data.result, dataSent));
      })
      .then()
      .catch((error) => handleCatch(dispatch, failure, error));
  };
  function request() {
    return { type: userConstants.GET_LIST_PAYMENT_SESSION_REQUEST };
  }

  function success(listPaySession, dataSent) {
    return { type: userConstants.GET_LIST_PAYMENT_SESSION_SUCCESS, listPaySession, dataSent };
  }
  function failure(error) {
    return { type: userConstants.GET_LIST_PAYMENT_SESSION_FAILURE, error };
  }
};



const getStatistics = (startDate, endDate, eventId = null) => {
  const accessToken = localStorage.getItem('accessToken');
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(request());
      API.get(
        `/api/user/report_revenus`,
        {
          params: {
            startDate,
            endDate,
            eventId,
          },
          headers: {
            Authorization: accessToken,
          },
        }
      )
        .then((res) => {
          dispatch(success(res.data.result, eventId));
          resolve(res.data);
        })
        .catch((error) => {
          handleCatch(dispatch, failure, error);
          reject(error);
        });
    });
  };
  function request() {
    return {
      type: userConstants.GET_STATISTICS_REQUEST,
    };
  }
  function success(data, eventId) {
    return {
      type: userConstants.GET_STATISTICS_SUCCESS,
      data,
      eventId,
    };
  }
  function failure(error) {
    return {
      type: userConstants.GET_STATISTICS_FAILURE,
      error,
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
  onUpdateBankInfor,
  onChangePassword,
  addPaymentCard,

  forgotPassword,
  requestForgotPassword,
  delCardDefault,
  postCardDefault,
  setReadNotification,
  setDeleteNotification,
  deleteEvent,
  getListPaymentSession,
  get_History,
  getListNotification,
  getBankAccount,
  getCreateHistory,
  getNumUnreadNotification,
  getChatHistory,
  getListCardPayment,
  getHistoryPayment,
  getStatistics
};


//http://localhost:5000/api/user/report_revenus?startDate=2020-06-26&endDate=2020-07-26
