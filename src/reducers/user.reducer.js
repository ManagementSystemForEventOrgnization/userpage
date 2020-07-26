import { userConstants } from '../constants/index';

const initialState = {
  isLogined: localStorage.getItem('isLogined'),
  errMessage: null,
  pending: false,
  userInfo: {},
  active: null,
  showCheckCode: false,
  showVerifyForgotPassword: false,
  notiPageNumber: 0,

  registeredEvents: [],
  createdEvents: [],

  notifications: [],
  numUnreadNotification: 0,
  statisticsData: [],
  chatHistory: [],
  listCard: [{}],
  historyPayment: [],
  deleteEvent: [],
  successDe: false,
  eventDelete: null,
  penDelet: false,
  errDelete: ' ',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        pending: true,
        errMessage: null,
        active: null,
      };

    case userConstants.LOGIN_SUCCESS:
      const avatarUser =
        action.user.avatar === '/avata.png'
          ? 'https://res.cloudinary.com/eventinyourhand/image/upload/v1593323314/publics/bg-3_pir7z6.jpg'
          : action.user.avatar;
      if (action.user.isActive) {
        localStorage.setItem('isLogined', true);
        localStorage.setItem('accessToken', action.user.accessToken.token);
        localStorage.setItem('username', action.user.fullName);
        localStorage.setItem('avatar', avatarUser);
        localStorage.setItem('userId', action.user._id);
      }

      return {
        ...state,
        isLogined: action.user.isActive,
        pending: false,
        userInfo: action.user,
        errMessage: null,
        active: action.user.isActive,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        errMessage: action.error,
        isLogined: false,
        pending: false,
      };

    case userConstants.LOGIN_GOOGLE_SUCCESS:
      if (action.user.isActive) {
        localStorage.setItem('isLogined', true);
        localStorage.setItem('accessToken', action.user.accessToken.token);
        localStorage.setItem('username', action.user.fullName);
        localStorage.setItem('avatar', action.user.avatar);
        localStorage.setItem('userId', action.user._id);
      }
      return {
        ...state,
        userInfo: action.user,
        isLogined: true,
        pending: false,
      };

    case userConstants.LOGIN_GOOGLE_FAILURE:
      return {
        ...state,
        userInfo: null,
        isLogined: false,
        pending: false,
        errMessage: action.error,
      };

    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        pending: true,
        errMessage: null,
      };

    case userConstants.REGISTER_SUCCESS:
      localStorage.setItem('accessToken', action.user.accessToken.token);

      return {
        ...state,
        pending: false,
        userInfo: action.user,
        active: false,
        showCheckCode: true,
      };
    case userConstants.REGISTER_FAILURE:
      return {
        ...state,
        errMessage: action.error,
        pending: false,
        showCheckCode: false,
      };
    case userConstants.CHECK_CODE_REQUEST:
      return {
        ...state,
        pending: true,
        errMessage: null,
      };
    case userConstants.CHECK_CODE_SUCCESS:
      const avatarUserNew =
        state.userInfo.avatar === '/avata.png'
          ? 'https://res.cloudinary.com/eventinyourhand/image/upload/v1593323314/publics/bg-3_pir7z6.jpg'
          : state.userInfo.avatar;
      localStorage.setItem('isLogined', true);
      localStorage.setItem('username', state.userInfo.fullName);
      localStorage.setItem('avatar', avatarUserNew);
      localStorage.setItem('userId', state.userInfo._id);

      return {
        ...state,
        isLogined: true,
        pending: false,
        active: true,
      };
    case userConstants.CHECK_CODE_FAILURE:
      return {
        ...state,
        errMessage: action.error,
        pending: false,
        active: false,
      };

    case userConstants.LOGOUT:
      localStorage.removeItem('isLogined');
      localStorage.removeItem('username');
      localStorage.removeItem('avatar');
      localStorage.removeItem('userId');
      localStorage.removeItem('currentSocket');
      localStorage.removeItem('currentIndex');
      localStorage.removeItem('accessToken');

      localStorage.removeItem('currentId');
      localStorage.removeItem('webAddress');

      return {
        ...state,
        userInfo: null,
        isLogined: false,
        pending: false,
        chatHistory: [],
      };

    case userConstants.GET_CURRENT_USER_REQUEST:
      return {
        ...state,
        pending: true,
      };

    case userConstants.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.user,
        pending: false,
      };
    case userConstants.GET_CURRENT_USER_FAILURE:
      return {
        ...state,
        userInfo: null,
        pending: false,
      };

    case userConstants.GET_BANK_INFOR_REQUEST:
      return {
        ...state,
        pending: true,
      };

    case userConstants.GET_BANK_INFOR_SUCCESS:
      return {
        ...state,
        bankInfor: action.bankInfor || {},
        pending: false,
      };

    case userConstants.GET_BANK_INFOR_FAILURE:
      return {
        ...state,
        bankInfor: null,
        pending: false,
      };

    //------------------------------
    case userConstants.ADD_PAYMENT_CARD_REQUEST: {
      return {
        ...state,
        pending: true,
        errMessage: '',
      };
    }

    case userConstants.ADD_PAYMENT_CARD_SUCCESS: {
      return {
        ...state,
        success: action.success,
        // listCard: [...state.listCard.filter(card => card.id !== action.cardId)],
        listCard: [...state.listCard, action.success],
        pending: false,
        errMessage: '',
      };
    }

    case userConstants.ADD_PAYMENT_CARD_FAILURE:
      return {
        ...state,
        errMessage: action.error,
        pending: false,
      };

    case userConstants.POST_CARDDEFAULT_REQUEST: {
      return {
        ...state,
        pending: true,
        CardSuccess: null,
        errMessage: '',
      };
    }

    case userConstants.POST_CARDDEFAULT_SUCCESS:
      return {
        ...state,
        CardSuccess: action.success,
        errMessage: '',
        pending: false,
      };

    case userConstants.POST_CARDDEFAULT_FAILURE:
      return {
        ...state,
        errMessage: action.error,
        CardSuccess: null,
        pending: false,
      };

    case userConstants.DEL_CARDDEFAULT_REQUEST: {
      return {
        ...state,
        pending: true,
        errMessage: '',
      };
    }

    case userConstants.DEL_CARDDEFAULT_SUCCESS:
      return {
        ...state,
        CardSuccess: action.success,
        listCard: [
          ...state.listCard.filter((card) => card.id !== action.cardId),
        ],
        pending: false,
        errMessage: '',
      };

    case userConstants.DEL_CARDDEFAULT_FAILURE:
      return {
        ...state,
        errMessage: action.error,
        pending: false,
      };

    case userConstants.GET_HISTORYPAYMENT_REQUEST: {
      return {
        ...state,
        pending: true,
        // historyPayment: null,
        paymentHistoryerr: null,
        errMessage: '',
      };
    }

    case userConstants.GET_HISTORYPAYMENT_SUCCESS:
      return {
        ...state,
        historyPayment: action.historyPayment,
        paymentHistoryerr: null,
        pending: false,
        errMessage: '',
      };

    case userConstants.GET_HISTORYPAYMENT_FAILURE:
      return {
        ...state,
        paymentHistoryerr: action.error,
        pending: false,
      };

    //-----------------------------

    case userConstants.UPDATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case userConstants.UPDATE_USER_PROFILE_SUCESS:
      localStorage.setItem('avatar', action.user.avatar);
      localStorage.setItem('username', action.user.fullName);
      return {
        ...state,
        pending: false,
        userInfo: action.user,
        errMessage: null,
      };
    case userConstants.UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        pending: false,
        errMessage: action.error,
      };
    case userConstants.SENDEMAILFORGOTPASSWORD_REQUEST:
      return {
        ...state,
        pending: true,
        errMessage: null,
      };

    case userConstants.SENDEMAILFORGOTPASSWORD_SUCCESS:
      return {
        ...state,
        pending: false,
        errMessage: null,
        showVerifyForgotPassword: true,
      };

    case userConstants.SENDEMAILFORGOTPASSWORD_FAILURE:
      return {
        ...state,
        pending: false,
        errMessage: action.error,
        showVerifyForgotPassword: false,
      };
    case userConstants.FORGOTPASSWORD_REQUEST:
      return {
        ...state,
        pending: true,
        errMessage: null,
      };

    case userConstants.CHANGEPASSWORD_SUCCESS:
      return {
        ...state,
        pending: false,
        errMessage: null,
      };

    case userConstants.CHANGEPASSWORD_FAILURE:
      return {
        ...state,
        pending: false,
        errMessage: action.error,
      };

    case userConstants.CHANGEPASSWORD_REQUEST:
      return {
        ...state,
        pending: true,
        errMessage: null,
      };
    case userConstants.FORGOTPASSWORD_SUCCESS:
      return {
        ...state,
        pending: false,
        errMessage: null,
      };

    case userConstants.FORGOTPASSWORD_FAILURE:
      return {
        ...state,
        pending: false,
        errMessage: action.error,
      };

    case userConstants.GET_LISTCARD_REQUEST:
      return {
        ...state,
        pending: true,
      };

    case userConstants.GET_LISTCARD_SUCCESS:
      return {
        ...state,
        listCard: action.listCard || [],
        pending: false,
      };

    case userConstants.GET_LISTCARD_FAILURE:
      return {
        ...state,
        listCard: [],
        pending: false,
      };

    case userConstants.GET_HISTORY_REQUEST:
      return {
        ...state,
        pending: true,
        errMessage: null,
      };
    case userConstants.GET_HISTORY_SUCCESS:
      return {
        ...state,
        registeredEvents: action.arrEvent,
        pending: false,
        errMessage: null,
      };

    case userConstants.GET_HISTORY_FAILURE:
      return {
        ...state,
        pending: true,
        errMessage: action.error,
      };
    case userConstants.GET_LIST_NOTIFICATION_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case userConstants.GET_LIST_NOTIFICATION_SUCCESS:
      return {
        ...state,
        pending: false,
        isLoadedMore: action.notifications.length === 10 ? true : false,
        notifications:
          action.notiPageNumber === 1
            ? [...action.notifications]
            : [...state.notifications, ...action.notifications],
        errMessage: null,
      };

    case userConstants.GET_LIST_NOTIFICATION_FAILURE:
      return {
        ...state,
        pending: false,
        errMessage: action.error,
      };
    case userConstants.GET_HISTORY_CREATE_REQUEST:
      return {
        ...state,
        pending: true,
        errMessage: null,
      };
    case userConstants.GET_HISTORY_CREATE_SUCCESS:
      return {
        ...state,
        createdEvents: action.dataSent.pageNumber === 1 ? [...action.arrEvent] : [...state.createdEvents, ...action.arrEvent],
        pending: false,
        errMessage: null,
      };

    case userConstants.GET_HISTORY_CREATE_FAILURE:
      return {
        ...state,
        pending: true,
        errMessage: action.error,
      };

    case userConstants.GET_UNREADNOTIFICATION:
      return {
        ...state,
        numUnreadNotification: action.numUnreadNotification,
      };

    case userConstants.GET_UNREADNOTIFICATION_FAILURE:
      localStorage.removeItem('isLogined');
      localStorage.removeItem('username');
      localStorage.removeItem('avatar');
      localStorage.removeItem('accessToken');

      return {
        ...state,
        isLogined: false,
      };

    case userConstants.SET_READ_NOTIFICATION:
      return {
        ...state,
      };

    case userConstants.DELETE_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications.filter(
            (item) => item._id !== action.delNotificationId
          ),
        ],
      };

    case userConstants.GET_CHAT_HISTORY:
      return {
        ...state,
        chatHistory: action.chatHistory,
      };
    case userConstants.DELETE_EVENT_REQUEST:
      return {
        ...state,
        penDelet: true,
      };
    case userConstants.DELETE_EVENT_FAILURE:
      return {
        ...state,
        penDelet: false,
        errDelete: action.error,
      };
    case userConstants.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        penDelet: false,
        deleteEvent: action.deEvent,
        successDe: true,
        createdEvents: [
          ...state.createdEvents.filter((e) => e._id !== action.eventId),
        ],
      };

    //---

    case userConstants.GET_STATISTICS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case userConstants.GET_STATISTICS_FAILURE:
      return {
        ...state,
        pending: false,
        errMessage: action.error,
        success: null
      };
    case userConstants.GET_STATISTICS_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        statisticsData: action.data
      };

    default:
      return state;
  }
};

export default user;
