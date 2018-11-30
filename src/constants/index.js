import Config from 'react-native-config';

/**
 * Localstorage Keys
 */
export const STORAGE_KEYS = {
  DB_VERSION: 'dbVersion',
  isTnCAccepted: 'isTnCAccepted', // Not used
  userSetupSavedObj: 'userSetupSavedObj', // Not used
};

/**
 * App Constants
 */
export const appConsts = {

  drawerVersion: "1",

  // Add Call -> Select Rcurring Type Screen
  rdRecurringTypeSelectReducer: 'RD_RECURRING_TYPE_SELECT_REDUCER',
  rdRecurringEndDateTypeSelectReducer: 'RD_RECURRING_END_DATE_TYPE_SELECT_REDUCER',
  txtRecurringDateSetReducer: 'TXT_RECURRING_DATE_SET_REDUCER',

  //addCall: 'ADD_CALL',
  callColorOptions: [
    {white: 0},
    {orangeRed: 1},
    {orange: 2},
    {yellow: 3},
    {springBud: 4},
    {turquoise: 5},
    {periwinkle: 6},
    {skyBlue: 7},
    {plum: 8},
    {desertsand: 9},
    {mauve: 11},
    {silver: 12}
  ],
  callColors: {
    white: '#FFFFFF',
    orangeRed: '#F28B82',
    orange: '#FBBC04',
    yellow: '#FFF475',
    springBud: '#CCFF90',
    turquoise: '#A7FFEB',
    periwinkle: '#CBF0F8',
    skyBlue: '#AECBFA',
    plum: '#D7AEFB',
    desertsand: '#FDCFE8',
    mauve: '#E6C9A8',
    silver: '#E8EAED'
  },
  rdOptionRecurring: {
    doNotRepeat: 0,
    daily: 1,
    weekly: 2,
    monthly: 3
  },
  rdOptionRecurringEndDate: {
    forever: 0,
    endDate: 1
  },


  addTodo: 'ADD_TODO',
  doneTodo: 'DONE_TODO',

  authStart: 'START_AUTHENTICATION',
  refreshToken: 'REFRESH_TOKEN',
  authFail: 'FAIL_AUTHENTICATION',
  authSuccess: 'SUCCESS_AUTHENTICATION',
  authWithSAML: 'AUTHENTICATION_WITH_SAML',
  clearAuthErr: 'CLEAR_AUTH_ERROR',
  clearUser: 'CLEAR_USER',
  setLoginData: 'SET_LOGIN_DATA',
  clearLoginData: 'CLEAR_LOGIN_DATA',
  forgotPasswordStart: 'FORGOT_PASSWORD_START',
  forgotPasswordFail: 'FORGOT_PASSWORD_FAIL',
  forgotPasswordSuccess: 'FORGOT_PASSWORD_SUCCESS',
  forgotPasswordResetData: 'FORGOT_PASSWORD_RESET_DATA',

//
  getRoomsStart: 'START_GET_ROOMS',
  getRoomsFail: 'FAIL_GET_ROOMS',
  getRoomsSuccess: 'SUCCESS_GET_ROOMS',
//
  createRoom: 'CREATE_ROOM',
  createRoomSuccess: 'CREATE_ROOM_SUCCESS',
  createRoomFail: 'CREATE_ROOM_FAIL',
  clearCreateRoomError: 'CLEAR_CREATE_ROOM_ERROR',
//
  getRoom: 'GET_ROOM',
  getRoomSuccess: 'GET_ROOM_SUCCESS',
  getRoomFail: 'GET_ROOM_FAIL',
//
  deleteRoom: 'DELETE_ROOM',
  deleteRoomSuccess: 'DELETE_ROOM_SUCCESS',
  deleteRoomFail: 'DELETE_ROOM_FAIL',
//
  invite: 'INVITE',
  inviteSuccess: 'INVITE_SUCCESS',
  inviteFail: 'INVITE_FAIL',
  setInviteData: 'SET_INVITE_DATA',
  clearInviteData: 'CLEAR_INVITE_DATA',
  openInviteDialog: 'OPEN_INVITE_DIALOG',
  closeInviteDialog: 'CLOSE_INVITE_DIALOG',
//
  inviteByEmail: 'INVITE_BY_EMAIL',
  inviteByEmailSuccess: 'INVITE_BY_EMAIL_SUCCESS',
  inviteByEmailFail: 'INVITE_BY_EMAIL_FAIL',
  cleareInviteErr: 'CLEARE_INVITE_ERR',
//
  inviteBySMS: 'INVITE_BY_SMS',
  inviteBySMSSuccess: 'INVITE_BY_SMS_SUCCESS',
  inviteBySMSFail: 'INVITE_BY_SMS_FAIL',
//
  getScreenshot: 'GET_SCREENHOT',
  getScreenshotSuccess: 'GET_SCREENHOT_SUCCESS',
  getScreenshotFail: 'GET_SCREENHOT_FAIL',
//
  uplScreenshot: 'UPL_SCREENHOT',
  uplScreenshotSuccess: 'UPL_SCREENHOT_SUCCESS',
  uplScreenshotFail: 'UPL_SCREENHOT_FAIL',
//
  getConfigData: 'GET_CONFIG_DATA',
  getConfigDataSuccess: 'GET_CONFIG_DATA_SUCCESS',
  getConfigDataFail: 'GET_CONFIG_DATA_FAIL',
  closePopup: 'CLOSE_TIMER_POPUP',
  openPopup: 'OPEN_TIMER_POPUP',
  setTimerID: 'SET_WAITING_TIMER_ID',
  clearTimerID: 'CLEAR_WAITING_TIMER_ID',
};

/**
 * Localstorage Keys
 */
export const ERROR_CODES = {
  STORAGE_SERVICE: {
    save: 6.1,
    get: 6.2,
    multiSave: 6.3,
    multiGet: 6.4
  }
};





export const COLORS = {
  red: '#DA342B',
  yellow: '#FDEA3A',
  white: '#FFFFFF',
  black: '#000000',
  tuatara: '#3B3A39',
  grey: '#E9E9E9',
  mercury_gray: '#E5E5E5',
  cod_gray: '#1C1B1A', // rgba(28, 27, 26, 1)
  cod_gray_dis: 'rgba(155, 155, 155, 0.7)',
  silver: '#CBCBCB',
  green: '#24C26C',
  trans: 'transparent',
};

export const FONTS = {
  condMedium: 'ConduitITCStd-Medium',
  condLight: 'ConduitITCStd-Light',
};

export const API = {
  login: 'sessions', // post
  forgorPassword: 'sessions/email/password-reset', //post
  roomList: 'room/', // get
  createRoom: 'room/', // post
  config: 'config', // get
  getRoom: (roomName) => (`room/${roomName}`),  // get
  deleteRoom: (roomName) => (`room/${roomName}`), //delete
  inviteByEmail: (roomName) => (`room/${roomName}/inviteByEmail`), //post
  inviteBySMS: (roomName) => (`room/${roomName}/inviteBySMS`), //post
  getScreenshot: (roomName) => (`room/${roomName}/screenshot`), //get
  uplScreenshot: (roomName) => (`room/${roomName}/screenshot`), //post
};

const URLS = {
  qa: {
    api: 'https://app.de.movmobiledev.com/api/v1/',
    ws: 'wss://app.de.movmobiledev.com/ws/',
  },
  dev: {
    api: 'https://app.dev.de.movmobiledev.com/api/v1/',
    ws: 'wss://app.dev.de.movmobiledev.com/ws/',
  },
  newDev: {
    api: 'https://movmobile.app/de/api/v1/',
    ws: 'wss://movmobile.app/de/ws/',
  },
};

export const API_CONSTS = {
  API_TOKEN: 'api_token',
  BASE_URL: Config.BASE_URL ? Config.BASE_URL : URLS['newDev'].api,
  SOCKET_URL: Config.SOCKET_URL ? Config.SOCKET_URL : URLS['newDev'].ws,
};

export const WEB_SOCKET_MESSAGE_TYPES = {
  error: 'error',
  token: 'token',
  joinRoom: 'joinRoom',
  startCall: 'startCall',
  endCall: 'endCall',
  generateToken: 'generateToken',
  participantJoined: 'participantJoined',
  participantLeft: 'participantLeft',
  statusRoom: 'statusRoom',
  ping: 'ping',
  muteChange: 'muteChange',
};

export const WEB_SOCKET = {
  joinRoom: {
    "type": WEB_SOCKET_MESSAGE_TYPES.joinRoom,
    "identity": "test"
  },
  startCall: {
    "type": WEB_SOCKET_MESSAGE_TYPES.startCall
  },
  generateToken: {
    "type": WEB_SOCKET_MESSAGE_TYPES.generateToken
  },
  endCall: {
    "type": WEB_SOCKET_MESSAGE_TYPES.endCall
  },
  ping: {
    "type": WEB_SOCKET_MESSAGE_TYPES.ping
  }
};

export const CHANNEL_SOURCE = {
  backCamera: 'back-camera',
  screen: 'screen-share',
};

export const FORMS = {
  email: 'email',
  phone: 'phone',
  name: 'name',
  password: 'password',
};

export const colorPalette = [
  '#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'
];
