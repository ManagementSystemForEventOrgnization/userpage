export const userConstants = {
    REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
    REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
    REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

    LOGIN_GOOGLE_SUCCESS: 'USERS_LOGIN_GOOGLE_SUCCESS',
    LOGIN_GOOGLE_FAILURE: 'USERS_LOGIN_GOOGLE_FAILURE',

    CHECK_CODE_REQUEST: 'USERS_CHECK_CODE_REQUEST',
    CHECK_CODE_SUCCESS: 'USERS_CHECK_CODE_SUCCESS',
    CHECK_CODE_FAILURE: 'USERS_CHECK_CODE_FAILURE',

    GET_CURRENT_USER_REQUEST: 'GET_CURRENT_USER_REQUEST',
    GET_CURRENT_USER_SUCCESS: 'GET_CURRENT_USER_SUCCESS',
    GET_CURRENT_USER_FAILURE: 'GET_CURRENT_USER_FAILURE',

    LOGOUT: 'LOGOUT',


}

export const eventConstants = {
    PREPARE_FOR_CREATE_EVENT: 'PREPARE_FOR_CREATE_EVENT',
}


export const createEventConstants = {
    posterStyle: {
        width: '100%',
        height: '60vh'
    },
    addressStyle: {
        position: 'absolute',
        top: '65%',
        left: '10%',
        fontSize: '20px'
    },
    typeOfEventStyle: {
        position: 'absolute',
        top: '73%',
        right: '1%',
    },
    nameEventStyle: {
        position: 'absolute',
        top: '25%',
        left: '10%',
        fontWeight: 'bolder',
        fontSize: '50px'
    },
    quantityStyle: {
        position: 'absolute',
        top: '73%'
    }

}
