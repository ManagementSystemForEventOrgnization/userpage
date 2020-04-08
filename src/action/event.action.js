// import API from './axious.config';
import { eventConstants } from '../constants/index';

const prepareForCreateEvent = (nameEvent, typeOfEvent, quantity, address) => {
    console.log(nameEvent, typeOfEvent, quantity, address)
    return dispatch => {
        dispatch(request(nameEvent, typeOfEvent, quantity, address));
    };

    function request(nameEvent, typeOfEvent, quantity, address) { return { type: eventConstants.PREPARE_FOR_CREATE_EVENT, nameEvent, typeOfEvent, quantity, address } }
}

export const eventActions = {
    prepareForCreateEvent,
}