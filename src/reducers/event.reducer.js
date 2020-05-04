import { eventConstants } from '../constants/index';
import { v4 as uuid } from 'uuid';

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
  const { blocks } = state;
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

    case eventConstants.DUPLICATE_BLOCK:
      const idDuplicate = action.id;
      const blockDuplicate = blocks.find((item) => item.id === idDuplicate);
      if (blockDuplicate) {
        const indexDuplicate = blocks.indexOf(blockDuplicate);
        const newBlockListDuplicate = [
          ...blocks.slice(0, indexDuplicate + 1),
          {
            ...blockDuplicate,
            id: uuid(),
          },
          ...blocks.slice(indexDuplicate + 1, blocks.length),
        ];
        return {
          ...state,
          blocks: newBlockListDuplicate,
        };
      }

      return {
        ...state,
      };

    case eventConstants.DELETE_BLOCK:
      const idDelete = action.id;
      const blockDelete = blocks.find((item) => item.id === idDelete);
      if (blockDelete) {
        const indexDelete = blocks.indexOf(blockDelete);
        const newBlockListDelete = [
          ...blocks.slice(0, indexDelete),
          ...blocks.slice(indexDelete + 1, blocks.length),
        ];
        return {
          ...state,
          blocks: newBlockListDelete,
        };
      }

      return {
        ...state,
      };

    default:
      return state;
  }
};

export default event;
