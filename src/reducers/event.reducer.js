import { v4 as uuid } from 'uuid';

import dataTest from 'containers/event/data/dataTest';
import { eventConstants } from 'constants/index';

const initialPageId = uuid();
const initialBlocks = [
  dataTest[1].value[1], //banner
  // ...dataTest[0].value,
  // ...dataTest[2].value, // event description
  // ...dataTest[13].value, //list of link documents
  // ...dataTest[3].value, // speaker, card
  // ...dataTest[4].value, // schedule
  dataTest[5].value[1], //map
  // ...dataTest[6].value, // countdown
  //dataTest[7].value[1], // video
  // ...dataTest[8].value, // sponsors
  // ...dataTest[9].value, //gallery
  dataTest[14].value[0], //sharing
  // ...dataTest[10].value, //contact us
  // ...dataTest[12].value, //comment

  dataTest[11].value[1], // footer,
];

const initialState = {
  nameEvent: '',
  typeOfEvent: '',
  category: '',
  banner: '',
  session: [],
  isSellTicket: 'Không',
  webAddress: '',
  blocks: [...initialBlocks],
  categories: [],
  errMessage: '',
  pending: false,
  id: '',
  events: [],
  hlEvent: [],

  pages: [
    {
      id: initialPageId,
      title: 'Home',
      child: [],
    },
  ],
  currentPage: initialPageId,
  system: [],
  headerStyle: {},
  comments: [],
  userJoinEvent: [],
};

const getIndexPage = (pages, currentPage) => {
  let count = 0;
  let flag = false;
  for (let index in pages) {
    if (flag) break;
    if (pages[index].child.length === 0) {
      if (pages[index].id === currentPage) {
        flag = true;
        break;
      }
      count++;
    } else {
      const temp = pages[index].child;
      for (let j in temp) {
        if (temp[j].id === currentPage) {
          flag = true;
          break;
        }
        count++;
      }
    }
  }
  return count;
};

const event = (state = initialState, action) => {
  switch (action.type) {
    case eventConstants.PREPARE_FOR_CREATE_EVENT:
      return {
        ...state,
        pending: true,
      };

    case eventConstants.PREPARE_FOR_CREATE_EVENT_SUCCESS:
      return {
        ...state,
        pending: false,
        id: action.id,
        nameEvent: action.nameEvent,
        webAddress: action.webAddress,
        typeOfEvent: action.typeOfEvent,
        banner: action.banner,
        session: action.session,
        category: action.category,
        isSellTicket: action.isSellTicket,
      };

    case eventConstants.PREPARE_FOR_CREATE_EVENT_FAILURE:
      return {
        ...state,
        pending: false,
        errMessage: action.err,
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
      const { blocks } = state;
      const index = blocks.findIndex((item) => item.id === action.id);
      if (index !== -1) {
        const newBlockListDuplicate = [
          ...blocks.slice(0, index + 1),
          {
            ...blocks[index],
            id: uuid(),
          },
          ...blocks.slice(index + 1, blocks.length),
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
      const blockDelete = state.blocks.find((item) => item.id === idDelete);
      if (blockDelete) {
        const indexDelete = state.blocks.indexOf(blockDelete);
        const newBlockListDelete = [
          ...state.blocks.slice(0, indexDelete),
          ...state.blocks.slice(indexDelete + 1, state.blocks.length),
        ];
        return {
          ...state,
          blocks: newBlockListDelete,
        };
      }

      return {
        ...state,
      };

    case eventConstants.GET_EVENT_DETAIL_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case eventConstants.GET_EVENT_DETAIL_SUCCESS:
      return {
        ...state,
        pending: false,
        blocks: action.page,
        pages: action.header.pages,
        headerStyle: action.header.style,
        currentIndex: action.index,
        session: action.event.session,
        id: action.event._id,
        banner: action.event.bannerUrl,
        nameEvent: action.event.name,

        // update event infor
      };

    case eventConstants.GET_EVENT_DETAIL_FAILURE:
      return {
        ...state,
        errMessage: action.err,
        pending: false,
      };

    case eventConstants.GET_EVENT_INFO:
      return {
        ...state,

        nameEvent: action.eventInfo.name,
        isSellTicket: action.eventInfo.isSellTicket,
        session: action.eventInfo.session,
        banner: action.eventInfo.bannerUrl,
        ticket: action.eventInfo.ticket,
        countComment: action.countComment,
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
        hlEvent: action.hlEvent || [],
      };
    case eventConstants.GET_LIST_EVENT_FAILURE:
      return {
        ...state,
        hlEvent: [],
      };
    case eventConstants.GET_USER_JOIN_EVENT_SUCCESS:
      return {
        ...state,
        userJoinEvent: action.userJoinEvent || [],
      };
    case eventConstants.GET_USER_JOIN_EVENT_FAILURE:
      return {
        ...state,
        userJoinEvent: [],
      };
    case eventConstants.GET_LIST_EVENT_COMING_UP_SUCCESS:
      return {
        ...state,
        events: action.events,
      };
    case eventConstants.GET_LIST_EVENT_COMING_UP_FAILURE:
      return {
        ...state,
        events: [],
      };

    case eventConstants.GET_HOME_DATA_SUSSESS:
      return {
        ...state,
        events: action.events,
        categories: action.categories,
      };
    case eventConstants.SAVE_PAGE:
      const { system } = state;
      const nextId = getIndexPage(state.pages, action.currentPage);

      return {
        ...state,
        system: [...system, action.blocks],
        pages: action.pages,
        currentPage: action.currentPage,
        blocks:
          nextId > state.system.length
            ? [...initialBlocks]
            : state.system[nextId],
      };

    case eventConstants.GET_PREVIOUS_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
        blocks: state.system[getIndexPage(state.pages, action.currentPage)],
      };

    case eventConstants.UPDATE_PAGE:
      return {
        ...state,
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

    case eventConstants.STORE_HEADER_STYLE:
      return {
        ...state,
        headerStyle: action.headerStyle,
      };

    case eventConstants.CHANGE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
        currentIndex: getIndexPage(state.pages, action.currentPage),
      };

    case eventConstants.CHANGE_PAGES:
      return {
        ...state,
        pages: action.pages,
        currentPage: action.currentPage,
      };

    case eventConstants.GET_COMMENT:
      return {
        ...state,
        comments: [...state.comments, ...action.comments],
      };

    case eventConstants.SAVE_COMMENT:
      return {
        ...state,
        submitting: true,
      };

    case eventConstants.SAVE_COMMNET_FAILURE:
      return {
        ...state,
        submitting: false,
      };

    case eventConstants.SAVE_COMMENT_SUCCESS:
      return {
        ...state,
        submitting: false,
        comments: [...action.comment, ...state.comments],
      };
    default:
      return state;
  }
};

export default event;
