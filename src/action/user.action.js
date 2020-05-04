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
          dispatch(failure(res.data.error.message || 'OOPs! something wrong'));
        }

        return res.data;
      })
      .catch((error) => {
        const { data } = error.response;
        if (data.error) {
          return dispatch(failure(data.error.message));
        }
        return dispatch(failure('OPPs! Something wrong'));
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
          dispatch(failure(res.data.error.message || 'OOPs! something wrong'));
      })
      .catch((err) => {
        const { data } = err.response;
        if (data.error) {
          return dispatch(failure(data.error.message));
        }
        return dispatch(failure('OOPs! something wrong'));
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
  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

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
          if (res.status === 200) {
            dispatch(success(res.data.result));
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
          dispatch(failure(res.data.error.message || 'OOPs! something wrong'));
        }
      })
      .catch((error) => {
        const { data } = error.response;
        if (data.error) {
          return dispatch(failure(data.error.message));
        }
        return dispatch(failure('OOPs! something wrong'));
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
        console.log(error);
        const { data } = error.response;
        if (data.error) {
          return dispatch(failure(data.error.message));
        }
        return dispatch(failure('OOPs! something wrong'));
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
      fullName: userInfor.fullName,
      birthday: userInfor.birthday,
      gender: userInfor.gender,
      job: userInfor.job,
      phone: userInfor.phone,
      discription: userInfor.discription,
      avatarUrl: userInfor.avatar,
    })
      .then((res) => {
        console.log('TCL then : ', res);

        if (res.status === 200) {
          dispatch(success(res.data.result.user));
        } else dispatch(failure(res.data.error.message || 'Some thing wrong'));
      })
      .catch((error) => {
        console.log('TCL catch : ', error.response);
        const { data } = error.response;
        if (data.error) {
          dispatch(failure(data.error.message));
        }
      });
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

// const testUpdateUser = () => {
//   const fullName = 'Phan Thi Mai';
//   const birthday = '10/06/1998';
//   const gender = 'Female';
//   const job = 'none';
//   const phone = '0869204167';
//   const discription = 'nothing';
//   const avatarUrl = 'star.jpg';

//   API.post(`/api/updateInfo`, {
//     fullName,
//     birthday,
//     gender,
//     job,
//     phone,
//     discription,
//     avatarUrl,
//   })
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err.response));
// };

export const userActions = {
  login,
  loginWithGoogle,
  register,
  checkCode,
  logout,
  getCurrentUser,
  onUpdateUserProfile,
};
