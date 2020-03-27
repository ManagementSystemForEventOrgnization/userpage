import {userConstants} from '../constants/index';

const initialState = {
    logined : false,
    errMessage: null,
    successMessage: null,
    pending: false,
    userInfo: null
}

const user = (state = initialState, action) =>{
    switch(action.type){
        case userConstants.LOGIN_REQUEST: 
            return {
                ...state,
                pending: true,
                
            }
        case userConstants.LOGIN_SUCCESS: 
            return {
                ...state,
                loggedIn: true,
                pending: false,
                userInfo: action.user,
            }
        case userConstants.LOGIN_FAILURE:
            return{
                ...state,
                errMessage: action.error,
                pending: false,
            }

        case userConstants.LOGIN:
            return{
                ...state,
                userInfo : action.user
            }
        
        case userConstants.REGISTER_REQUEST: 
            return {
                ...state,
                pending: true,
                
            }
        case userConstants.REGISTER_SUCCESS: 
            return {
                ...state,
                loggedIn: true,
                pending: false,
                userInfo: action.user,
            }
        case userConstants.REGISTER_FAILURE:
            return{
                ...state,
                errMessage: action.error,
                pending: false,
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