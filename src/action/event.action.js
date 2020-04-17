// import API from './axious.config';
import { eventConstants } from '../constants/index';

const prepareForCreateEvent = (nameEvent, typeOfEvent, category, quantity, address, locationName, time, isSellTicket) => {
    return dispatch => {
        dispatch(request(nameEvent, typeOfEvent, category, quantity, address, locationName, time, isSellTicket));
    };

    function request(nameEvent, typeOfEvent, category, quantity, address, locationName, time, isSellTicket) { return { type: eventConstants.PREPARE_FOR_CREATE_EVENT, nameEvent, typeOfEvent, category, quantity, address, locationName, time, isSellTicket } }
}

const storeBlocksWhenCreateEvent = (blocks) => {
    return dispatch => {
        dispatch(request(blocks));
    };

    function request(blocks) { return { type: eventConstants.STORE_BLOCKS_WHEN_CREATE_EVENT, blocks } }
}

export const eventActions = {
    prepareForCreateEvent,
    storeBlocksWhenCreateEvent
}