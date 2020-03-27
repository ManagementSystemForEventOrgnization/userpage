import API from './axious.config';
import {userConstants} from '../constants/index'

const login =  (email, password) =>{
    return API
        .post(`/api/login`, {
            email,
            password,
        })
        .then(res => { 
            console.log(res)
            return res
        })
}

// const  login = (email, password) => {
//     console.log(email, password)
//     return dispatch => {
//         dispatch(request());

//         setTimeout(() => {
//             API
//                 .post(`/api/login`, {
//                     email,
//                     password,
//                 })
//                 .then(res => {
//                     console.log(res);
//                     if(res.data){
//                         dispatch(success(res.data.user))
//                     }
//                 })
//                 .catch(error => {
//                     return dispatch(failure(error.response.data.message || 'Tài khoản hoặc mật khẩu không đúng!'));
//                 })
//         }, 1000)
//     };

//     function request() { return { type: userConstants.LOGIN_REQUEST} }
//     function success(user) { return { type: userConstants.LOGIN_SUCCESS, user} }
//     function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
// }

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

}

const logout = () =>{

}


export const userActions = {
    login,
    loginWithGoogle,
    register,
    logout

}