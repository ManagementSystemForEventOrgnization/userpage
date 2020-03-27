import API from './axious.config';
import {userConstants} from '../constants/index'

const  login = (email, password) => {
    return dispatch => {

        dispatch(request());
        API
            .post(`/api/login`, {
                email,
                password,
            })
            .then(res => {
                console.log(res);

                if(!res.data.message){
                    dispatch(success(res.data));

                } 
                else{
                    dispatch(failure(res.data.message|| 'Tài khoản hoặc mật khẩu không đúng!' ));
                }


            
            })
            .catch(error => {
                console.log(error)
                return dispatch(failure('Tài khoản hoặc mật khẩu không đúng!' || 'Tài khoản hoặc mật khẩu không đúng!'));
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

}

const logout = () =>{

}


export const userActions = {
    login,
    loginWithGoogle,
    register,
    logout

}