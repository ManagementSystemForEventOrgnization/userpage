import API from './axious.config';
import { userConstants } from '../constants/index';

const login = (email, password) => {
  return (dispatch) => {
    dispatch(request());
    API.post(`/api/login`, {
      email,
      password,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(success(res.data.result));
        } else {
          dispatch(
            failure(
              res.data.error.message || 'Tài khoản hoặc mật khẩu không đúng!'
            )
          );
        }

        return res.data;
      })
      .catch((error) => {
        const { data } = error.response;
        if (data) {
          return dispatch(failure(data.error.message));
        }
        return dispatch(failure('Tài khoản hoặc mật khẩu không đúng!'));
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
        if (res.status === 200) dispatch(success(res.data.result));
        else
          dispatch(failure(res.data.error.message || 'Một số lỗi đã xảy ra'));
      })
      .catch((err) => {
        const { data } = err.response;
        if (data) {
          return dispatch(failure(data.error.message));
        }
        return dispatch(failure('Một số lỗi đã xảy ra'));
      });
  };
  function success(user) {
    return { type: userConstants.LOGIN_GOOGLE_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_GOOGLE_FAILURE, error };
  }
};

const register = (email, password, fullName) => {
  const regex = /^[0-9a-zA-Z][a-z0-9A-Z\.\_]{1,}@[a-z0-9]{2,}(\.[a-z0-9]{1,4}){1,2}$/gm;

  return (dispatch) => {
    if (!regex.test(email)) {
      return dispatch(failure('Invalid email !'));
    } else if (password.length < 3) {
      return dispatch(failure('Password has at least 3 characters !'));
    } else {
      dispatch(request());
      API.post(`/api/register`, {
        email,
        password,
        fullName,
      })
        .then((res) => {
          if (res.status === 200) {
            dispatch(success(res.data.result));
          } else {
            dispatch(
              failure(
                res.data.error.message || 'Email hoặc mật khẩu không hợp lệ!'
              )
            );
          }
        })
        .catch((error) => {
          const { data } = error.response;
          if (data) {
            return dispatch(
              failure(data.error.message) || 'Email hoặc mật khẩu không hợp lệ!'
            );
          }
          return dispatch(
            failure(error) || 'Email hoặc mật khẩu không hợp lệ!'
          );
        });
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
        if (res.status === 200) {
          dispatch(success());
        } else {
          dispatch(failure(res.data.error.message || 'OTP không hợp lệ!'));
        }
      })
      .catch((error) => {
        const { data } = error.response;
        if (data) {
          return dispatch(failure(data.error.message));
        }
        return dispatch(
          failure('Xác thực không thành công do một vài sự cố !')
        );
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
        if (res.status === 200) {
          dispatch(success(res.data.result));
        } else {
          dispatch(failure(res.data.error.message));
        }
      })
      .catch((error) => {
        const { data } = error.response;
        if (data) {
          return dispatch(failure(data.error.message));
        }
        return dispatch(failure(error));
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
    API.get(`/api/current_user`)
      .then((res) => {
        if (res.status === 200) {
          dispatch(success(res.data));
        } else {
          dispatch(failure(res.message));
        }
      })
      .catch((error) => {
        return dispatch(failure(error));
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
export const userActions = {
  login,
  loginWithGoogle,
  register,
  checkCode,
  logout,
  getCurrentUser,
  onUpdateUserProfile,
};
