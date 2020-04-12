// import API from './axious.config';
import { eventConstants } from '../constants/index';

const prepareForCreateEvent = (nameEvent, typeOfEvent, category, quantity, address, locationName, time, isSellTicket) => {
    return dispatch => {
        dispatch(request(nameEvent, typeOfEvent, category, quantity, address, locationName, time, isSellTicket));
    };

    function request(nameEvent, typeOfEvent, category, quantity, address, locationName, time, isSellTicket) { return { type: eventConstants.PREPARE_FOR_CREATE_EVENT, nameEvent, typeOfEvent, category, quantity, address, locationName, time, isSellTicket } }
}

export const eventActions = {
    prepareForCreateEvent,
}