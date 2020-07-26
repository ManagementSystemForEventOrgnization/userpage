import HomePage from 'pages/HomePage';
import AboutUs from 'pages/AboutUsPage';

import MyEventsPage from 'pages/MyEventsPage';

import UserEventPage from 'pages/UserEventPage';
import PrepareForCreateEvent from 'pages/PrepareForCreateEvent';
import ManageEventPage from 'pages/ManageEventPage';
import CreateHistoryEventPage from 'pages/CreateHistoryEvent';

import CategoryDetailPage from 'pages/CategoryDetailPage';
import EventDetailPage from 'pages/EventDetailPage';

import LoginPage from 'pages/LoginPage';
import SignUpPage from 'pages/SignUpPage';
import ForgotPasswordPage from 'pages/ForgotPasswordPage';

import CreateEventPage from 'pages/CreateEventPage';
import PreviewEvent from 'containers/event/PreviewEvent';
import NotFoundPage from 'pages/NotFoundPage';

export const userConstants = {
  REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
  REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
  REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

  LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

  LOGIN_GOOGLE_SUCCESS: 'USERS_LOGIN_GOOGLE_SUCCESS',
  LOGIN_GOOGLE_FAILURE: 'USERS_LOGIN_GOOGLE_FAILURE',

  CHECK_CODE_REQUEST: 'USERS_CHECK_CODE_REQUEST',
  CHECK_CODE_SUCCESS: 'USERS_CHECK_CODE_SUCCESS',
  CHECK_CODE_FAILURE: 'USERS_CHECK_CODE_FAILURE',

  GET_CURRENT_USER_REQUEST: 'GET_CURRENT_USER_REQUEST',
  GET_CURRENT_USER_SUCCESS: 'GET_CURRENT_USER_SUCCESS',
  GET_CURRENT_USER_FAILURE: 'GET_CURRENT_USER_FAILURE',

  GET_BANK_INFOR_REQUEST: 'GET_BANK_INFOR_REQUEST',
  GET_BANK_INFOR_SUCCESS: 'GET_BANK_INFOR_SUCCESS',
  GET_BANK_INFOR_FAILURE: 'GET_BANK_INFOR_FAILURE',

  UPDATE_USER_PROFILE_REQUEST: 'UPDATE_USER_PROFILE_REQUEST',
  UPDATE_USER_PROFILE_SUCESS: 'UPDATE_USER_PROFILE_SUCESS',
  UPDATE_USER_PROFILE_FAILURE: 'UPDATE_USER_PROFILE_FAILURE',

  UPDATE_BANK_INFOR_REQUEST: 'UPDATE_BANK_INFOR_REQUEST',
  UPDATE_BANK_INFOR_SUCESS: 'UPDATE_BANK_INFOR_SUCESS',
  UPDATE_BANK_INFOR_FAILURE: 'UPDATE_BANK_INFOR_FAILURE',

  SENDEMAILFORGOTPASSWORD_REQUEST: 'USERS_FORGOTPASSWORD_REQUEST',
  SENDEMAILFORGOTPASSWORD_SUCCESS: 'USERS_FORGOTPASSWORD_SUCCESS',
  SENDEMAILFORGOTPASSWORD_FAILURE: 'USERS_FORGOTPASSWORD_FAILURE',

  FORGOTPASSWORD_REQUEST: 'USERS_FORGOTPASSWORD_REQUEST',
  FORGOTPASSWORD_SUCCESS: 'USERS_FORGOTPASSWORD_SUCCESS',
  FORGOTPASSWORD_FAILURE: 'USERS_FORGOTPASSWORD_FAILURE',

  CHANGEPASSWORD_REQUEST: 'USERS_CHANGEPASSWORD_REQUEST',
  CHANGEPASSWORD_SUCCESS: 'USERS_CHANGEPASSWORD_SUCCESS',
  CHANGEPASSWORD_FAILURE: 'USERS_CHANGEPASSWORD_FAILURE',

  GET_HISTORY_REQUEST: 'USERS_GET_HISTORY_REQUEST',
  GET_HISTORY_SUCCESS: 'USERS_GET_HISTORY_SUCCESS',
  GET_HISTORY_FAILURE: 'USERS_GET_HISTORY_FAILURE',

  ADD_PAYMENT_CARD_SUCCESS: 'ADD_PAYMENT_CARD_SUCCESS',
  ADD_PAYMENT_CARD_FAILURE: 'ADD_PAYMENT_CARD_FAILURE',
  ADD_PAYMENT_CARD_REQUEST: 'ADD_PAYMENT_CARD_REQUEST',

  GET_LISTCARD_SUCCESS: 'GET_LISTCARD_SUCCESS',
  GET_LISTCARD_FAILURE: 'GET_LISTCARD_FAILURE',
  GET_LISTCARD_REQUEST: 'GET_LISTCARD_REQUEST',

  POST_CARDDEFAULT_REQUEST: 'POST_CARDDEFAULT_REQUEST',
  POST_CARDDEFAULT_FAILURE: 'POST_CARDDEFAULT_FAILURE',
  POST_CARDDEFAULT_SUCCESS: 'POST_CARDDEFAULT_SUCCESS',

  DEL_CARDDEFAULT_REQUEST: 'DEL_CARDDEFAULT_REQUEST',
  DEL_CARDDEFAULT_FAILURE: 'DEL_CARDDEFAULT_FAILURE',
  DEL_CARDDEFAULT_SUCCESS: 'DEL_CARDDEFAULT_SUCCESS',

  GET_HISTORYPAYMENT_REQUEST: 'GET_HISTORYPAYMENT_REQUEST',
  GET_HISTORYPAYMENT_FAILURE: 'GET_HISTORYPAYMENT_FAILURE',
  GET_HISTORYPAYMENT_SUCCESS: 'GET_HISTORYPAYMENT_SUCCESS',

  //get_HistoryCreate
  GET_HISTORY_CREATE_REQUEST: 'USERS_GET_HISTORY_CREATE_REQUEST',
  GET_HISTORY_CREATE_SUCCESS: 'USERS_GET_HISTORY_CREATE_SUCCESS',
  GET_HISTORY_CREATE_FAILURE: 'USERS_GET_HISTORY_CREATE_FAILURE',

  GET_LIST_NOTIFICATION_REQUEST: 'GET_LIST_NOTIFICATION_REQUEST',
  GET_LIST_NOTIFICATION_SUCCESS: 'USERS_LIST_NOTIFICATION_SUCCESS',
  GET_LIST_NOTIFICATION_FAILURE: 'USERS_LIST_NOTIFICATION_FAILURE',

  GET_UNREADNOTIFICATION: 'GET_UNREADNOTIFICATION',
  GET_UNREADNOTIFICATION_FAILURE: 'GET_UNREADNOTIFICATION_FAILURE',
  SET_READ_NOTIFICATION: 'SET_READ_NOTIFICATION',
  DELETE_NOTIFICATION: 'DELETE_NOTIFICATION',

  GET_CHAT_HISTORY: 'GET_CHAT_HISTORY',

  DELETE_EVENT_REQUEST: 'DELETE_EVENT_REQUEST',
  DELETE_EVENT_SUCCESS: ' DELETE_EVENT_SUCCESS',
  DELETE_EVENT_FAILURE: 'DELETE_EVENT_FAILURE',

  LOGOUT: 'LOGOUT',
};

export const eventConstants = {
  PREPARE_FOR_CREATE_EVENT: 'PREPARE_FOR_CREATE_EVENT',
  PREPARE_FOR_CREATE_EVENT_SUCCESS: 'PREPARE_FOR_CREATE_EVENT_SUCCESS',
  PREPARE_FOR_CREATE_EVENT_FAILURE: 'PREPARE_FOR_CREATE_EVENT_FAILURE',

  UPDATE_EVENT_INFOR: 'UPDATE_EVENT_INFOR',
  UPDATE_EVENT_INFOR_SUCCESS: 'UPDATE_EVENT_INFOR_SUCCESS',
  UPDATE_EVENT_INFOR_FAILURE: 'UPDATE_EVENT_INFOR_FAILURE',

  STORE_BLOCKS_WHEN_CREATE_EVENT: 'STORE_BLOCKS_WHEN_CREATE_EVENT',

  GET_LIST_EVENT_COMING_UP_SUCCESS: 'GET_LIST_EVENT_COMING_UP_SUCCESS',
  GET_LIST_EVENT_COMING_UP_FAILURE: 'GET_LIST_EVENT_COMING_UP_FAILURE',

  GET_LIST_EVENT_REQUEST: 'GET_LIST_EVENT_REQUEST',
  GET_LIST_EVENT_SUCCESS: 'GET_LIST_EVENT_SUCCESS',
  GET_LIST_EVENT_FAILURE: 'GET_LIST_EVENT_FAILURE',
  GET_USER_JOIN_EVENT_REQUEST: 'GET_USER_JOIN_EVENT_REQUEST',
  GET_USER_JOIN_EVENT_SUCCESS: 'GET_USER_JOIN_EVENT_SUCCESS',
  GET_USER_JOIN_EVENT_FAILURE: 'GET_USER_JOIN_EVENT_FAILURE',

  GET_HOME_DATA_SUSSESS: 'GET_HOME_DATA_SUCCESS',
  GET_HOME_DATA_FAILURE: 'GET_HOME_DATA_FAILURE',

  GET_CATEGORIES_SUCCESS: 'GET_CATEGORIES_SUCCESS',
  GET_CATEGORIES_FAILURE: 'GET_CATEGORIES_FAILURE',

  DUPLICATE_BLOCK: 'DUPLICATE_BLOCK',
  DELETE_BLOCK: 'DELETE_BLOCK',

  GET_EVENT_DETAIL_SUCCESS: 'GET_EVENT_DETAIL_SUCCESS',
  GET_EVENT_DETAIL_FAILURE: 'GET_EVENT_DETAIL_FAILURE',
  GET_EVENT_DETAIL_REQUEST: 'GET_EVENT_DETAIL_REQUEST',

  SAVE_EVENT_DETAIL: 'SAVE_EVENT_DETAIL',
  SAVE_EVENT_DETAIL_SUCCESS: 'SAVE_EVENT_DETAIL_SUCCESS',
  SAVE_EVENT_DETAIL_FAILURE: 'SAVE_EVENT_DETAIL_FAILURE',

  SAVE_PAGE: 'SAVE_PAGE',
  GET_PREVIOUS_PAGE: 'GET_PREVIOUS_PAGE',
  UPDATE_PAGE: 'UPDATE_PAGE',

  GET_EVENT_EDIT: 'GET_EVENT_EDIT',
  GET_EVENT_EDIT_FAILURE: 'GET_EVENT_EDIT_FAILURE',
  STORE_HEADER_STYLE: 'STORE_HEADER_STYLE',

  CHANGE_CURRENT_PAGE: 'CHANGE_CURRENT_PAGE',
  CHANGE_PAGES: 'CHANGE_PAGES',

  GET_EVENT_INFO: 'GET_EVENT_INFO',
  GET_COMMENT: 'GET_COMMENT',

  SAVE_COMMENT: 'SAVE_COMMENT',
  SAVE_COMMENT_SUCCESS: 'SAVE_COMMENT_SUCCESS',
  SAVE_COMMNET_FAILURE: 'SAVE_COMMNET_FAILURE',

  CANCEL_EVENT_REQUEST: 'CANCEL_EVENT_REQUEST',
  CANCEL_EVENT_SUCCESS: ' CANCEL_EVENT_SUCCESS',
  CANCEL_EVENT_FAILURE: 'CANCEL_EVENT_FAILURE',
};

export const applyEventConstants = {
  APPLY_EVENT_REQUEST: 'APPLY_EVENT_REQUEST',
  APPLY_EVENT_REQUEST_SUCCESS: 'APPLY_EVENT_REQUEST_SUCCESS',
  APPLY_EVENT_REQUEST_FAILURE: 'APPLY_EVENT_REQUEST_FAILURE',
};

export const notificationTypeConstants = {
  CREDIT_REFUND_SUCCESS:
    'https://res.cloudinary.com/eventinyourhand/image/upload/v1592035622/NotifyIcon/credit-card-refund-pngrepo-com_jom3oh.png',
  CREDIT_REFUND_FAILED:
    'https://res.cloudinary.com/eventinyourhand/image/upload/v1592035614/NotifyIcon/Failed-Payment-Limit-300x300_lxf4q7.png',
  SESSION_CANCEL:
    'https://res.cloudinary.com/eventinyourhand/image/upload/v1592035650/NotifyIcon/calendar-cancel-512_f9syk9.png',
  EVENT_REJECT:
    'https://res.cloudinary.com/eventinyourhand/image/upload/v1592035636/NotifyIcon/time_event_calendar_remove_cancel_delete-512_w3oyse.png',
  EVENT_CANCEL:
    'https://res.cloudinary.com/eventinyourhand/image/upload/v1592035629/NotifyIcon/icons8-cancel_oighvs.png',
  ZALOPAY_REFUND_SUCCESS:
    'https://res.cloudinary.com/eventinyourhand/image/upload/v1592035663/NotifyIcon/1024x1024bb_vxlebi.png',
  ZALOPAY_REFUND_FAILED:
    'https://res.cloudinary.com/eventinyourhand/image/upload/v1592035656/NotifyIcon/unnamed_hgy4pg.png',
  START_EVENT: 'START_EVENT',
  JOINED_EVENT:
    'https://res.cloudinary.com/eventinyourhand/image/upload/v1592035642/NotifyIcon/icons8-tear_off_calendar_snrtfo.png',
  FINISH_EVENT: 'FINISH_EVENT',
  UNKNOW: 'UNKNOW',
};

export const layoutConstants = {
  BASE_LAYOUT: 'BASE_LAYOUT',
  NO_LAYOUT: 'NO_LAYOUT',
};

export const routeConstant = {
  routes: [
    {
      path: '/',
      exact: true,
      main: HomePage,
    },
    {
      path: '/about-us',
      exact: true,
      main: AboutUs,
    },
    {
      path: '/event-list/:id',
      exact: false,
      main: CategoryDetailPage,
    },
    {
      path: '/profile',
      exact: true,
      main: MyEventsPage,
    },
    {
      path: '/manage/:id',
      exact: true,
      main: ManageEventPage,
    },
    {
      path: '/registered-event',
      exact: true,
      main: UserEventPage,
    },
    {
      path: '/created-event',
      exact: true,
      main: CreateHistoryEventPage,
    },
    {
      path: '/create',
      exact: true,
      main: CreateEventPage,
    },

    //
  ],

  route1: [
    {
      path: '/prepare',
      exact: true,
      main: PrepareForCreateEvent,
    },

    {
      path: '/event/:id',
      exact: true,
      main: EventDetailPage,
    },
    {
      path: '/event/:id/:name',
      exact: true,
      main: EventDetailPage,
    },
    {
      path: '/login',
      exact: true,
      main: LoginPage,
    },
    {
      path: '/signup',
      exact: true,
      main: SignUpPage,
    },

    {
      path: '/preview/:id',
      exact: true,
      main: PreviewEvent,
    },

    {
      path: '/forgotpassword',
      exact: true,
      main: ForgotPasswordPage,
    },

    {
      path: '',
      exact: true,
      main: NotFoundPage,
    },
  ],
};
