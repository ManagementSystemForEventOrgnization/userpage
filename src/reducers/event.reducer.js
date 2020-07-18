import { v4 as uuid } from 'uuid';

import dataTest from 'containers/event/data/dataTest';
import { eventConstants } from 'constants/index';

const initialPageId = uuid();
const initialBlocks = [
  dataTest[1].value[2], //banner
  //...dataTest[0].value,
  dataTest[2].value[0], // event description
  ...dataTest[13].value, //list of link documents
  ...dataTest[3].value, // speaker, card
  dataTest[4].value[1], // schedule
  dataTest[5].value[1], //map
  ...dataTest[6].value, // countdown
  dataTest[7].value[1], // video
  ...dataTest[8].value, // sponsors
  ...dataTest[9].value, //gallery
  dataTest[14].value[0], //sharing
  ...dataTest[10].value, //contact us
  ...dataTest[12].value, //comment
  ...dataTest[11].value, // footer,
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
    price: 15000,
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
  penListEvent: false,

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

  currentIndex: localStorage.getItem('currentIndex' || 0),
  domain:
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_DOMAIN_EVENT
      : process.env.REACT_APP_DOMAIN_EVENT_DEPLOY,
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

// const getCurrentPage = (pages, index) => {
//   const editSite = localStorage.getItem('editSite');
//   const currentIndex = localStorage.getItem('currentIndex');

//   if (editSite || index === 0) {
//     if (pages[0].child.length === 0) return pages[0].id;
//     return pages[0].child[0].id;
//   } else {
//     let count = 0;
//     for (let i in pages) {
//       if (pages[i].child === 0) {
//         if (count === index) return pages[i].id;
//       } else {
//         for (let j in pages[i].child) {
//           if (count === index) return pages[i].child[j].id;
//           count++;
//         }
//       }
//       count++;
//     }
//   }
// };

const getId = (temp, indexT) => {
  let lengthTemp = temp.length;
  let lengthChild = 0;

  const editSite = localStorage.getItem('editSite');

  if (editSite || indexT === 0) {
    if (temp[0].child.length === 0) return temp[0].id;
    return temp[0].child[0].id;
  }

  for (let i = 0; i < +lengthTemp; i++) {
    let elem = temp[i];
    let child = elem.child;
    lengthChild = child.length;

    if (lengthChild) {
      if (child[indexT]) {
        return child[indexT].id;
      }
      indexT = indexT - lengthChild;
    } else {
      if (!indexT) {
        return elem.id;
      }
      indexT = indexT - 1;
    }
  }
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
        currentPage: getId(action.header.pages, action.index), //THIS
        //  currentPage: state.currentIndex
        isSellTicket: action.event.isSellTicket,

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
        domain: action.eventInfo.domain,
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
        currentPage: '',
      };

    case eventConstants.SAVE_EVENT_DETAIL_FAILURE:
      return {
        ...state,
        pending: false,
      };
    case eventConstants.GET_LIST_EVENT_REQUEST:
      return {
        ...state,
        hightLightFinishLoading: true,
      };
    case eventConstants.GET_LIST_EVENT_SUCCESS:
      return {
        ...state,
        hlEvent: action.hlEvent || [],
        hightLightFinishLoading: false,
      };
    case eventConstants.GET_LIST_EVENT_FAILURE:
      return {
        ...state,
        hlEvent: [],
        hightLightFinishLoading: false,
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
          nextId > state.system.length
            ? [...state.system, action.blocks]
            : [
              ...state.system.slice(0, nextId - 1),
              action.blocks,
              ...state.system.slice(nextId, state.system.length),
            ],
        pages: action.pages,
        currentPage: action.currentPage,
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
      localStorage.setItem(
        'currentIndex',
        getIndexPage(state.pages, action.currentPage)
      );

      return {
        ...state,
        currentPage: action.currentPage,
        currentIndex: getIndexPage(state.pages, action.currentPage),
        blocks:
          state.system[getIndexPage(state.pages, action.currentPage)] ||
          initialBlocks,
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

    case eventConstants.CLEAR_COMMENT:
      return {
        ...state,
        comments: []
      }
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
