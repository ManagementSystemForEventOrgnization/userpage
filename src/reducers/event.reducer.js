import { v4 as uuid } from 'uuid';

import dataTest from 'containers/event/data/dataTest';
import { eventConstants } from 'constants/index';

const initialPageId = uuid();
const initialBlocks = [
  dataTest[1].value[0], //banner
  //...dataTest[0].value,
  dataTest[2].value[2], // event description
  ...dataTest[13].value, //list of link documents
  dataTest[3].value[0], // speaker, card
  ...dataTest[4].value, // schedule
  dataTest[5].value[1], //map
  ...dataTest[6].value, // countdown
  dataTest[7].value[1], // video
  dataTest[8].value[0], // sponsors
  dataTest[9].value[0], //gallery
  dataTest[14].value[0], //sharing
  ...dataTest[10].value, //contact us
  ...dataTest[12].value, //comment

  dataTest[11].value[1], // footer,
];

const bannerUrl =
  'https://res.cloudinary.com/eventinyourhand/image/upload/v1592538982/banner_trgqw7.jpg';

const initialState = {
  nameEvent: '',
  typeOfEvent: 'Public',
  category: '',
  banner: bannerUrl,
  session: [],
  isSellTicket: 'No',
  webAddress: '',
  blocks: [...initialBlocks],
  categories: [],
  errMessage: '',
  pending: false,
  id: '',
  ticket: {
    price: 0,
    discount: 0,
  },
  status: 'DRAFT',

  events: [],
  hlEvent: [],
  errCancel: '',
  deleteEvent: [],
  cancelEvent: [],
  pendCancel: false,
  cancelSession: false,
  successDe: false,

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

  hightLightFinishLoading: false,
  upcomingFinishLoading: false,
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

const getCurrentPage = (page) => {
  if (page.child.length === 0) return page.id;
  return page.child[0].id;
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

    case eventConstants.UPDATE_EVENT_INFOR:
      return {
        ...state,
        pending: true,
      };

    case eventConstants.UPDATE_EVENT_INFOR_SUCCESS:
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

    case eventConstants.UPDATE_EVENT_INFOR_FAILURE:
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
      const editSite = localStorage.getItem('editSite');
      return {
        ...state,
        pending: false,
        blocks: editSite ? action.page[0] : action.page,
        pages: action.header.pages,
        headerStyle: action.header.style,
        currentIndex: action.index,
        session: action.event.session,
        id: action.event._id,
        banner: action.event.bannerUrl,
        nameEvent: action.event.name,
        ticket: action.event.ticket,
        status: action.event.status,
        system: editSite ? action.page : [],
        currentPage: editSite
          ? getCurrentPage(action.header.pages[0])
          : state.currentPage,

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
        category: action.eventInfo.category,
        webAddress: action.eventInfo.urlWeb,
        typeOfEvent: action.eventInfo.typeOfEvent,

        countComment: action.countComment,
        status: action.eventInfo.status,
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
        hightLightFinishLoading: true,
      };
    case eventConstants.GET_LIST_EVENT_FAILURE:
      return {
        ...state,
        hlEvent: [],
        hightLightFinishLoading: true,
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
        upcomingFinishLoading: true,
      };
    case eventConstants.GET_LIST_EVENT_COMING_UP_FAILURE:
      return {
        ...state,
        events: [],
        upcomingFinishLoading: true,
      };

    case eventConstants.GET_HOME_DATA_SUSSESS:
      return {
        ...state,
        events: action.events,
        categories: action.categories,
      };

    case eventConstants.SAVE_PAGE: // pages, currentPage, blocks
      const nextId = getIndexPage(state.pages, action.currentPage);

      return {
        ...state,
        blocks:
          nextId >= state.system.length
            ? [...initialBlocks]
            : state.system[nextId],
        system:
          nextId >= state.system.length
            ? [...state.system, action.blocks]
            : [
                ...state.system.slice(0, nextId),
                action.blocks,
                ...state.system.slice(nextId + 1, state.system.length),
              ],
        pages: action.pages,
        currentPage: action.currentPage,
      };

    case eventConstants.GET_PREVIOUS_PAGE:
      console.log(action.currentPage);
      console.log(state.pages);
      console.log(getIndexPage(state.pages, action.currentPage));
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

    case eventConstants.DELETE_EVENT_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case eventConstants.DELETE_EVENT_FAILURE:
      return {
        ...state,
        pending: false,
        errMessage: action.error,
      };
    case eventConstants.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        pending: false,
        deleteEvent: action.deleteEvent,
        successDe: true,
      };
    case eventConstants.CANCEL_EVENT_REQUEST:
      return {
        ...state,
        pendCancel: true,
      };
    case eventConstants.CANCEL_EVENT_FAILURE:
      return {
        ...state,
        pendCancel: false,
        errCancel: action.error,
      };
    case eventConstants.CANCEL_EVENT_SUCCESS:
      return {
        ...state,
        pendCancel: false,
        cancelEvent: action.cancelEvent,
        cancelSession: true,
      };
    default:
      return state;
  }
};

export default event;
