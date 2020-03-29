import API from './axious.config';
import {userConstants} from '../constants/index'

const  login = (email, password) => {
    console.log(email, password);
    return dispatch => {
        dispatch(request());
        API
            .post(`/api/login`, {
                email,
                password,
            })
            .then(res => {
                console.log(res);

                if(!res.data.message ){
                    dispatch(success(res.data));
                } 
                else{
                    dispatch(failure(res.data.message|| 'Tài khoản hoặc mật khẩu không đúng!' ));
                }


            
            })
            .catch(error => {
                console.log(error)
                return dispatch(failure('Tài khoản hoặc mật khẩu không đúng!'));
            })
    };

    function request() { return { type: userConstants.LOGIN_REQUEST} }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user} }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

const loginWithGoogle = (accessToken) => {
    return API
        .post(`/auth/google`,
        {
            accessToken
        }
        )
        .then(res => {
            console.log(res)
            return res
        })
}

const register = (email, password, fullName) =>{

    console.log(email, password, fullName);

    return dispatch => {
        dispatch(request());
        API
            .post(`/api/register`, {
                email,
                password,
                fullName
            })
            .then(res => {
                console.log(res);

                if(!res.data.message){
                    dispatch(success(res.data));

                } 
                else{
                    dispatch(failure(res.data.message|| 'Email hoặc mật khẩu không hợp lệ!' ));
                }
            })
            .catch(error => {
                console.log(error)
                return dispatch(failure(error)
                ||'Email hoặc mật khẩu không hợp lệ!');
            })
    };

    function request() { return { type: userConstants.REGISTER_REQUEST} }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user} }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }

}


const checkCode = (code) => {
    console.log(code);
    return dispatch  => {
        dispatch(request());
        API
            .post(`/api/verifyToken`, {
                code
            })
            .then(res => {
                console.log(res);

                if(res.status === 200){
                    dispatch(success());

                } 
                else if(res.status === 422){
                    dispatch(failure(res.data.message|| 'OTP không hợp lệ!' ));
                }
            })
            .catch(error => {
                console.log(error)
                return dispatch(failure(error)
                ||'OTP không hợp lệ!');
            })


    };
    function request() { return { type: userConstants.CHECK_CODE_REQUEST} }
    function success() { return { type: userConstants.CHECK_CODE_SUCCESS} }
    function failure(error) { return { type: userConstants.CHECK_CODE_FAILURE, error } }
}

const logout = () =>{

}


export const userActions = {
    login,
    loginWithGoogle,
    register,
    checkCode,
    logout

}