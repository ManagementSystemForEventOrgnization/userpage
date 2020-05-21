import { v4 as uuid } from 'uuid';

import dataTest from 'containers/event/data/dataTest';
import { eventConstants } from 'constants/index';

const initialState = {
  nameEvent: '',
  typeOfEvent: '',
  category: '',
  quantity: 0,
  session: [],
  isSellTicket: 'Không',
  webAddress: '',
  blocks: [
    ...dataTest[0].value,
    ...dataTest[1].value,
    ...dataTest[2].value,
    ...dataTest[3].value,
    ...dataTest[4].value,
    ...dataTest[5].value,
    // ...dataTest[6].value,
    // ...dataTest[7].value,
    // ...dataTest[8].value,
    // ...dataTest[9].value,
    // ...dataTest[10].value,
    // ...dataTest[11].value,
    // ...dataTest[12].value,
  ],
  categories: [],
  errMessage: '',
  pending: false,
  id: '',
  events: [],

  unEditableHtml: [],
  routes: [],
  currentRoute: 'home',
};

const event = (state = initialState, action) => {
  const { blocks } = state;
  switch (action.type) {
    case eventConstants.PREPARE_FOR_CREATE_EVENT:
      return {
        ...state,
        pending: true,
      };

    case eventConstants.PREPARE_FOR_CREATE_EVENT_SUCCESS:
      console.log(action);
      return {
        ...state,
        pending: false,
        id: action._id,
        nameEvent: action.nameEvent,
        webAddress: action.webAddress,
        typeOfEvent: action.typeOfEvent,
        quantity: action.quantity,
        address: action.address,
        map: action.map,
        category: action.category,
        locationName: action.locationName,
        time: action.time,
        isSellTicket: action.isSellTicket,
      };

    case eventConstants.PREPARE_FOR_CREATE_EVENT_FAILURE:
      return {
        ...state,
        pending: false,
        errMessage: action.err,
        nameEvent: '',
        typeOfEvent: '',
        category: '',
        quantity: 0,
        address: '',
        locationName: '',
        map: {},
        time: {},
        isSellTicket: 'Không',
        webAddress: '',
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

    case eventConstants.GET_EVENT_DETAIL_SUCCESS:
      return {
        ...state,
        page: action.page,
      };

    case eventConstants.GET_EVENT_DETAIL_FAILURE:
      return {
        ...state,
        errMessage: action.err,
      };

    case eventConstants.SAVE_EVENT_DETAIL:
      return {
        ...state,
        pending: true,
      };

    case eventConstants.SAVE_EVENT_DETAIL_SUCCESS:
      return {
        ...state,
        pending: false,
      };

    case eventConstants.SAVE_EVENT_DETAIL_FAILURE:
      return {
        ...state,
        pending: false,
      };
    case eventConstants.GET_LIST_EVENT_SUCCESS:
      return {
        ...state,
        events: action.events,
      };
    case eventConstants.GET_LIST_EVENT_FAILURE:
      return {
        ...state,
        events: [],
      };

    case eventConstants.SAVE_PAGE:
      let { unEditableHtml, routes } = state;
      const { route, innerHtml, editable } = action;
      const newPage = {
        route,
        innerHtml,
        editable, // false
      };

      unEditableHtml.push(newPage);
      return {
        ...state,
        unEditableHtml,
        routes: routes.push(route),
        currentRoute: route,
      };

    case eventConstants.UPDATE_PAGE:
      const currentIndex = unEditableHtml.findIndex(
        (item) => item.route === action.route
      );
      unEditableHtml[currentIndex].innerHtml = action.innerHtml;
      return {
        ...state,
        unEditableHtml,
      };

    case eventConstants.GET_EVENT_EDIT:
      return {
        ...state,
        blocks: action.page,
      };

    case eventConstants.GET_EVENT_EDIT_FAILURE:
      return {
        ...state,
        errMessage: action.err,
      };

    default:
      return state;
  }
};

export default event;
