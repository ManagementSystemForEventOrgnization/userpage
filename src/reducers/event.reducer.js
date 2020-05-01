import { eventConstants } from '../constants/index';

const initialState = {
  nameEvent: '',
  typeOfEvent: '',
  category: '',
  quantity: 100,
  address: '',
  locationName: '',
  time: {},
  isSellTicket: 'Không',
  blocks: [
    /**
     * id
     * option
     * style
     */
  ],
  categories: [],
};

const event = (state = initialState, action) => {
  switch (action.type) {
    case eventConstants.PREPARE_FOR_CREATE_EVENT:
      return {
        ...state,
        nameEvent: action.nameEvent,
        typeOfEvent: action.typeOfEvent,
        quantity: action.quantity,
        address: action.address,
        category: action.category,
        locationName: action.locationName,
        time: action.time,
        isSellTicket: action.isSellTicket,
      };

    case eventConstants.STORE_BLOCKS_WHEN_CREATE_EVENT:
      return {
        ...state,
        blocks: action.blocks,
      };

    case eventConstants.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.categories,
      };

    case eventConstants.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        categories: [],
      };

    default:
      return state;
  }
};

export default event;
