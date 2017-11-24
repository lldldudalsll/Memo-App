/* 모든 action type 상수들을 모두 이 파일 안에 적어서 사용. */

/* AUTHENTICATION */

/* Login */
export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";


/* Register */
export const AUTH_REGISTER = "AUTH_REGISTER";
export const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS";
export const AUTH_REGISTER_FAILURE = "AUTH_REGISTER_FAILURE";

/* Session */
export const AUTH_GET_STATUS = "AUTH_GET_STATUS";
export const AUTH_GET_STATUS_SUCCESS = "AUTH_GET_STATUS_SUCCESS";
export const AUTH_GET_STATUS_FAILURE = "AUTH_GET_STATUS_FAILURE";

/* Logout */
export const AUTH_LOGOUT = "AUTH_LOGOUT";
// 로그아웃은 성공하고 안하고가 중요하지 않기 떄문에, 액션 하나로도 충분.


/* MEMO */

/* Post */
export const MEMO_POST = "MEMO_POST";
export const MEMO_POST_SUCCESS = "MEMO_POST_SUCCESS";
export const MEMO_POST_FAILURE = "MEMO_POST_FAILURE";

/* List */
export const MEMO_LIST = "MEMO_LIST";
export const MEMO_LIST_SUCCESS = "MEMO_LIST_SUCCESS";
export const MEMO_LIST_FAILURE = "MEMO_LIST_FAILURE";