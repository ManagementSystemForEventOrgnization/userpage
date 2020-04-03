import API from './axious.config';
import { userConstants } from '../constants/index'

const login = (email, password) => {
    return dispatch => {
        dispatch(request());
        API
            .post(`/api/login`, {
                email,
                password,
            })
            .then(res => {

                if (!res.data.message) {
                    dispatch(success(res.data));
                }
                else {
                    dispatch(failure(res.data.message || 'Tài khoản hoặc mật khẩu không đúng!'));
                }



            })
            .catch(error => {
                return dispatch(failure('Tài khoản hoặc mật khẩu không đúng!'));
            })
    };

    function request() { return { type: userConstants.LOGIN_REQUEST } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

const loginWithGoogle = (profile) => {
    return API
        .post(`/auth/google`,
            {
                profile
            }
        )
        .then(res => {
            userConstants.LOGIN_GOOGLE(res.data)
        })
}

// const loginWithGG = (accessToken) => {
//     const authOptions = {
//         method: 'POST',
//         url: `${API_URL}users/login/google`,
//         headers: {
//             'Access_token': accessToken,
//             'Content-Type': 'application/json'
//         },
//         json: true
//     };
//     return dispatch => {
//         API(authOptions)
//             .then(result => {
//                 dispatch(success(result.data.user, isTeacher));
//                 if (isTeacher) {
//                     history.push('/teacher-home');
//                 }
//                 else {
//                     history.push('/home');
//                 }
//             })
//             .catch(error => {
//                 return dispatch(failure(error.response.data.message || 'Đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại!'));
//             })

//     };

//     function success(user, isTeacher) { return { type: userConstants.LOGIN_SUCCESS, user, isTeacher } }
//     function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
// }


const register = (email, password, fullName) => {
    return dispatch => {
        dispatch(request());
        API
            .post(`/api/register`, {
                email,
                password,
                fullName
            })
            .then(res => {

                if (!res.data.message) {
                    dispatch(success(res.data));

                }
                else {
                    dispatch(failure(res.data.message || 'Email hoặc mật khẩu không hợp lệ!'));
                }
            })
            .catch(error => {
                return dispatch(failure(error)
                    || 'Email hoặc mật khẩu không hợp lệ!');
            })
    };

    function request() { return { type: userConstants.REGISTER_REQUEST } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }

}


const checkCode = (code) => {
    return dispatch => {
        dispatch(request());
        API
            .post(`/api/verifyToken`, {
                code
            })
            .then(res => {

                if (res.status === 200) {
                    dispatch(success());

                }
                else if (res.status === 422) {
                    dispatch(failure(res.data.message || 'OTP không hợp lệ!'));
                }
            })
            .catch(error => {
                return dispatch(failure('Xác thực không thành công do một vài sự cố !'));
            })


    };
    function request() { return { type: userConstants.CHECK_CODE_REQUEST } }
    function success() { return { type: userConstants.CHECK_CODE_SUCCESS } }
    function failure(error) { return { type: userConstants.CHECK_CODE_FAILURE, error } }
}

const logout = () => {
    console.log('logout')
    return dispatch => {
        API
            .get(`/api/logout`)
            .then(res => {
                dispatch({ type: userConstants.LOGOUT });
            })
    };
}


const getCurrentUser = () => {
    return dispatch => {
        dispatch(request());
        API
            .get(`/api/current_user`)
            .then(res => {
                if (res.status === 200) {
                    dispatch(success(res.data));
                }
                else {
                    dispatch(failure(res.message));
                }
            })
            .catch(error => {
                return dispatch(failure(error));
            })
    };

    function request() { return { type: userConstants.GET_CURRENT_USER_REQUEST } }
    function success(user) { return { type: userConstants.GET_CURRENT_USER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_CURRENT_USER_FAILURE, error } }

}


export const userActions = {
    login,
    loginWithGoogle,
    register,
    checkCode,
    logout,
    getCurrentUser,

}