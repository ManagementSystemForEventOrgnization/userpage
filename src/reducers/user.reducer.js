import {userConstants} from '../constants/index';

const initialState = {
    logined : false,
    errMessage: null,
    successMessage: null,
    pending: false,
    userInfo: null,
    active: false,
}

const user = (state = initialState, action) =>{
    switch(action.type){

        case userConstants.LOGIN_REQUEST: 
            return {
                ...state,
                pending: true,
                errMessage: null
            }
        case userConstants.LOGIN_SUCCESS: 
            action.user && localStorage.setItem("isLogined", true);
            return {
                ...state,
                loggedIn: true,
                pending: false,
                userInfo: action.user ,
                errMessage: null,
                active: action.user.isActive,
            }
        case userConstants.LOGIN_FAILURE:
            return{
                ...state,
                errMessage: action.error,
                pending: false,
            }



        case userConstants.REGISTER_REQUEST: 
            return {
                ...state,
                pending: true,
                errMessage: null
            }
        case userConstants.REGISTER_SUCCESS: 
            return {
                ...state,
                pending: false,
                userInfo: action.user,
                active: false,
            }
        case userConstants.REGISTER_FAILURE:
            return{
                ...state,
                errMessage: action.error,
                pending: false,
            }




        case userConstants.CHECK_CODE_REQUEST: 
            return {
                ...state,
                pending: true,
                errMessage: null
            }
        case userConstants.CHECK_CODE_SUCCESS: 
            return {
                ...state,
                loggedIn: true,
                pending: false,
                active: true,
            }
        case userConstants.CHECK_CODE_FAILURE:
            return{
                ...state,
                errMessage: action.error,
                pending: false,
                active: false,
            }


        case userConstants.LOGOUT: 
            return {
                ...state,
                loggedIn: false,
                errMessage: null,
                successMessage: null,
                pending: false,
                userInfo: null,
            }

        default: 
            return state
    }
}

export default user;