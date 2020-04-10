import { eventConstants } from '../constants/index';

const initialState = {
    nameEvent: '',
    typeOfEvent: '',
    quantity: 0,
    address: '',
}

const user = (state = initialState, action) => {
    switch (action.type) {

        case eventConstants.PREPARE_FOR_CREATE_EVENT:
            return {
                ...state,
                nameEvent: action.nameEvent,
                typeOfEvent: action.typeOfEvent,
                quantity: action.quantity,
                address: action.address
            }


        default:
            return state
    }
}

export default user;