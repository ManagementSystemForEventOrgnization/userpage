import {userConstant} from '../constants/index';

const initialState = {
    logined : false,
    errMessage: null,
    successMessage: null,
    pending: false,
    userInfo: null
}

const user = (state = initialState, action) =>{
    switch(action.type){
        case userConstant.LOGIN_REQUEST: 
            return {
                ...state,
                pending: true,
                
            }
        case userConstant.LOGIN_SUCCESS: 
            return {
                ...state,
                loggedIn: true,
                pending: false,
                userInfo: action.user,
            }
        case userConstant.LOGIN_FAILURE:
            return{
                ...state,
                errMessage: action.error,
                pending: false,
            }
        
        case userConstant.REGISTER_REQUEST: 
            return {
                ...state,
                pending: true,
                
            }
        case userConstant.REGISTER_SUCCESS: 
            return {
                ...state,
                loggedIn: true,
                pending: false,
                userInfo: action.user,
            }
        case userConstant.REGISTER_FAILURE:
            return{
                ...state,
                errMessage: action.error,
                pending: false,
            }

        case userConstant.LOGOUT: 
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